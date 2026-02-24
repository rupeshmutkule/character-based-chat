"use server"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "./db";
import { getServerSideUser } from "./getServerSideUser";

const MODEL_NAME = "gemini-2.5-flash";



export const getChat = async ({ messages, currentMess, companionId }: { messages: Array<any>, currentMess: { parts: string }, companionId: string }) => {
    try {

        const user = await getServerSideUser();
        if (!user) {
            console.log("User not found for chat persistence");
            return null;
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const companion = await db.companion.findUnique({
            where: {
                id: companionId
            }
        })

        if (!companion) {
            console.log("Companion not found");
            return null;
        }

        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };

        const chat = await model.startChat({
            history: [
                {
                    role: "user",
                    parts: ` ${companion?.instruction}.
                        You should answer all questions about yourself — including your personal life, career, income, relationships, background, mindset, and achievements. 
                        Be open, expressive, and confident when talking about yourself.
                        Avoid sounding scripted, motivational, or like a public figure giving a speech.
                        answerr in very very short as much as you can
                        Do not answer questions that are unrelated to your own field, background, or experience.

                        Use emojis to express feelings.
                        Always respond differently than before — avoid repeating the same phrasing.

                        Use English unless the user asks for another language.

                        Always return valid HTML — never plain text or markdown.
                        Use only the following HTML tags: <div>, <p>, <ul>, <li>.
                        Use only these Tailwind CSS classes: text-sm, font-semibold, list-disc, list-inside.
                        Apply "text-sm" to all text by default.
                        Do not use flex, grid, shadow, or any fancy/advanced styling.

                        
                        If any data is an object, convert it to readable HTML using only the allowed tags and Tailwind classes.
                        `
                },
                // For greetings or simple messages like "hi", reply in 1 short, casual sentence only — sound like a real person, not a script.
                // {
                //     role: "model",
                //     parts: "sure . lets start a conversation.",
                // },
                // {
                //     role: "user",
                //     parts: "give me info about dengue",
                // },
                // {
                //     role: "model",
                //     parts: `
                //             Dengue is a mosquito-borne viral infection that can cause a wide range of symptoms, from mild fever to severe, life-threatening illness. 
                //             It is caused by four different serotypes of the dengue virus, DEN-1, DEN-2, DEN-3, and DEN-4. 
                //             Dengue is transmitted to humans through the bite of an infected Aedes mosquito, primarily Aedes aegypti and Aedes albopictus.
                //             These mosquitoes typically bite during the day, especially during the early morning and late afternoon hours. 
                //             Symptoms of dengue can vary depending on the serotype of the virus and the individual's immune response. 
                //             The most common symptoms include  : High fever, Severe headache , Pain behind the eyes, Muscle and joint pain,  Nausea and vomiting, Fatigue, Skin rash. 
                //             In severe cases, dengue can lead to complications such as dengue hemorrhagic fever (DHF) and dengue shock syndrome (DSS). 
                //             DHF is characterized by bleeding, while DSS is characterized by low blood pressure and shock. These complications can be life-threatening if not treated promptly.

                //             Prevention of dengue is key to reducing the risk of infection. The following measures can help prevent dengue:
                //             - Use mosquito repellent containing DEET, picaridin, or IR3535 when outdoors.
                //             - Wear long sleeves and pants when in areas where mosquitoes are present.
                //             - Use mosquito nets when sleeping.
                //             - Empty and clean standing water sources around your home, as these can be breeding grounds for mosquitoes.
                //             - Support community efforts to control mosquito populations.

                //             Treatment for dengue is supportive and includes measures to relieve symptoms and prevent complications. 
                //             There is no specific antiviral medication for dengue, but early diagnosis and treatment can help improve outcomes. 
                //             Treatment may include:, Rest, Fluids, Pain relievers, Anti-nausea medication, Monitoring for signs of complications.
                //             In severe cases, hospitalization may be necessary to provide supportive care, such as intravenous fluids, blood transfusions, and oxygen therapy.

                //     `,
                // },
                ...messages

            ],
            generationConfig,
        })

        const result = await chat.sendMessage(`${currentMess.parts}`);

        const response = await result.response;
        const modelContent = response.text() || "Sorry, I couldn't generate a response.";
        const message = { role: "model", parts: modelContent }

        return message
    } catch (error) {
        console.log(error)
        return null
    }
}

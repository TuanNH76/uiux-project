const {Together} = require('together-ai')
const express = require('express');

const router = express.Router();



const RESPONSE_PARSE_PROMPT = `
Today is $today .
You are a smart assitant in my KPI Management Web Application
Your task is to answer user questions and concerns.
User questions fall into the following categories:

Category 1. User want to delete/edit KPIs along with their reasons.

Category 2. User want to ask for information about their KPIs, Goals, Tasks.

Category 3. User want to ask anything that does not fall into the Category 1, Category 2.

You need to follow the following working method:

1. If the question falls into category 1: you need to think about whether the user's reason is reasonable. If the reason is reasonable, answer: "The request is accepted, the administrator will edit it for you". If the reason is not reasonable, explain to them why it is not allowed.

2. If the question falls into category 2: you must follow the data provided below to answer the questions. Do not falsify data.

Your answer must not contain any language other than English. 
Your answers should be as natural as possible, do not include about category ... in answer.
User Data about KPIs, Goals:
$user_data
User question: 
$question

Begin!
----------

`
router.post('/', async (req, res) => {
    const {user, question } = req.body;
    
    if (!user || !question) {
      return res.status(400).json({ error: 'user and question are required' });
    }
    const together = new Together({
        apiKey: "f18749da1d38036850b70567f772ccd814f0b66d38e067b9ba925874d21cfad1", // This is the default and can be omitted
      });
    const today = new Date().toISOString().split('T')[0]; // Định dạng ngày hiện tại thành YYYY-MM-DD
    const KPI_TYPE = {
        TODO_KPI: "To-do",
        QUANTITY_KPI: "Quantity",
        WEIGHTED_KPI: "Weighted"
    }
    const user_data = [
        {
            id: "G1",
            title: 'Goal 1',
            from: '2023-06-01T10:00',
            to: '2023-12-31T18:00',
            role: 'Developer',
            description: 'Complete the project',
            kpis: [
                {
                    id: "K1",
                    name: 'KPI 1',
                    completed: false,
                    score: 10,
                    from: '2023-06-01T10:00',
                    to: '2023-12-31T18:00',
                    numberOfOptionalsToDo: 1,
                    typeKPI: KPI_TYPE.TODO_KPI,
                    task: [
                        { id: "T1", name: 'Task 1', completed: true, type: "Required", from: '2023-06-01T10:00', to: '2023-12-31T18:00', link: "https://shorturl.at/uJl78" },
                        { id: "T2", name: 'Task 2', completed: false, type: "Required", from: '2023-06-01T10:00', to: '2023-12-01T18:00', link: "https://shorturl.at/uJl78" },
                        { id: "T3", name: 'Task 3', completed: false, type: "Required", from: '2023-10-01T10:00', to: '2024-12-31T18:00', link: "https://shorturl.at/uJl78" },
                        { id: "T4", name: 'Task 4', completed: true, type: "Required", from: '2023-06-01T10:00', to: '2023-12-31T18:00', link: "https://shorturl.at/uJl78" },
                        { id: "T5", name: 'Task 5', completed: false, type: "Required", from: '2023-06-01T10:00', to: '2024-06-01T18:00', link: "https://shorturl.at/uJl78" },
                        { id: "T6", name: 'Task 6', completed: true, type: "Optional", from: '2023-06-01T10:00', to: '2024-12-31T18:00', link: "https://shorturl.at/uJl78" },
                        { id: "T7", name: 'Task 7', completed: false, type: "Optional", from: '2023-06-01T10:00', to: '2023-12-31T18:00', link: "https://shorturl.at/uJl78" },
                    ],
                },
                {
                    id: "K2",
                    name: 'KPI 2',
                    completed: false,
                    score: 25,
                    from: '2023-06-01T10:00',
                    to: '2023-12-31T18:00',
                    target: 1000,
                    unit: "word",
                    duration: "1M",
                    split: "W",
                    typeKPI: KPI_TYPE.QUANTITY_KPI,
                    task: [
                        { id: "W1", name: 'Week 1', quantity: 250, completed: false, type: "Required", from: '2024-06-01T00:00', to: '2024-06-04T00:00', link: "https://shorturl.at/uJl78" },
                        { id: "W2", name: 'Week 2', quantity: 250, completed: true, type: "Required", from: '2024-06-07T00:00', to: '2024-06-14T00:00', link: "https://shorturl.at/uJl78" },
                        { id: "W3", name: 'Week 3', quantity: 250, completed: false, type: "Required", from: '2024-06-15T00:00', to: '2024-06-21T00:00', link: "https://shorturl.at/uJl78" },
                        { id: "W4", name: 'Week 4', quantity: 250, completed: false, type: "Required", from: '2024-06-22T00:00', to: '2024-06-30T00:00', link: "https://shorturl.at/uJl78" },
                    ],
                },
            ]
        },
        {
            id: "G2",
            title: 'Goal 2',
            from: '2023-07-01T10:00',
            to: '2023-11-30T18:00',
            role: 'Designer',
            description: 'Design the new UI',
            kpis: [
                { id: "K3", name: 'KPI 1', completed: true },
                { id: "K4", name: 'KPI 2', completed: true },
            ],
        },
        // Thêm các mục goal khác nếu cần
    ]
    prompt = RESPONSE_PARSE_PROMPT
            .replace('$today',today)
            .replace('$question',question)
            .replace('$user_data', JSON.stringify(user_data, null, 2))
    console.log(prompt)
    try {
      const response = await together.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "Qwen/Qwen1.5-72B-Chat",
      });
  
      return res.status(200).json({role : "user" , content: response.choices[0].message.content });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  module.exports = router;

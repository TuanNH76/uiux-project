const { Together } = require('together-ai')
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

1. If the question falls into category 1: you need to think about whether the user's reason is reasonable.
Acceptable reasons include: completed, completed but not updated, administrator error, setup error, duplicate, repeated...
Unacceptable reasons such as: I hate it, I don't like it, I don't want to do it...
If the reason is reasonable, answer: "The request is accepted, the administrator will edit it for you". If the reason is not reasonable, explain to them why it is not allowed.

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
  const { user, question } = req.body;
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
            {
                id: "K3",
                name: 'KPI 3',
                completed: false,
                score: 25,
                from: '2023-06-01T10:00',
                to: '2023-12-31T18:00',
                typeKPI: KPI_TYPE.WEIGHTED_KPI,
                task: [
                    { id: "T04", name: 'Task 4', weight: 10, completed: false, type: "Required", from: '2024-06-22T00:00', to: '2024-06-30T00:00', link: "https://shorturl.at/uJl78" },
                    { id: "T01", name: 'Task 1', weight: 50, completed: false, type: "Required", from: '2024-06-01T00:00', to: '2024-06-04T00:00', link: "https://shorturl.at/uJl78" },
                    { id: "T02", name: 'Task 2', weight: 30, completed: true, type: "Required", from: '2024-06-07T00:00', to: '2024-06-14T00:00', link: "https://shorturl.at/uJl78" },
                    { id: "T03", name: 'Task 3', weight: 10, completed: false, type: "Required", from: '2024-06-15T00:00', to: '2024-06-21T00:00', link: "https://shorturl.at/uJl78" },
                ],
            },
        ]
    },
    {
        id: "G11",
        title: 'Design Course Development',
        from: '2023-01-01T08:00',
        to: '2023-06-30T17:00',
        role: 'Lecturer',
        description: 'Develop the curriculum for the new computer science course',
        kpis: [
            {
                id: "K11",
                name: 'Course Outline Completion',
                completed: false,
                score: 20,
                from: '2023-01-01T08:00',
                to: '2023-03-31T17:00',
                numberOfOptionalsToDo: 1,
                typeKPI: KPI_TYPE.TODO_KPI,
                task: [
                    { id: "T11", name: 'Draft Syllabus', completed: true, type: "Required", from: '2024-06-01T08:00', to: '2024-06-08T17:00', link: "https://shorturl.at/uJl78" },
                    { id: "T22", name: 'Review by Peers', completed: false, type: "Required", from: '2024-06-16T08:00', to: '2024-06-30T17:00', link: "https://shorturl.at/uJl78" },
                    { id: "T33", name: 'Finalize Outline', completed: false, type: "Required", from: '2024-07-01T08:00', to: '2024-07-10T17:00', link: "https://shorturl.at/uJl78" },
                    { id: "T333", name: 'Demo code', completed: true, type: "Required", from: '2024-07-01T08:00', to: '2024-07-10T17:00', link: "https://shorturl.at/uJl78" },
                    { id: "T332", name: 'Trial teaching', completed: false, type: "Required", from: '2024-07-01T08:00', to: '2024-07-10T17:00', link: "https://shorturl.at/uJl78" },
                    { id: "T44", name: 'Optional Reading List', completed: true, type: "Optional", from: '2024-07-20T08:00', to: '2024-07-29T17:00', link: "https://shorturl.at/uJl78" },
                    { id: "T55", name: 'Refer to existing lectures', completed: true, type: "Optional", from: '2024-07-20T08:00', to: '2024-07-29T17:00', link: "https://shorturl.at/uJl78" },
                ],
            },
            {
                id: "K22",
                name: 'Lecture Material Preparation',
                completed: false,
                score: 30,
                from: '2023-04-01T08:00',
                to: '2023-06-30T17:00',
                target: 20,
                unit: "lectures",
                duration: "1Y",
                split: "M",
                typeKPI: KPI_TYPE.QUANTITY_KPI,
                task: [
                    { id: "M11", name: 'Month 1', quantity: 2, completed: false, type: "Required", from: '2024-01-01T00:00', to: '2024-01-30T00:00', link: "https://shorturl.at/uJl78" },
                    { id: "M22", name: 'Month 2', quantity: 2, completed: true, type: "Required", from: '2024-02-01T00:00', to: '2024-02-28T00:00', link: "https://shorturl.at/uJl78"  },
                    { id: "M33", name: 'Month 3', quantity: 4, completed: false, type: "Required", from: '2024-03-01T00:00', to: '2024-03-30T00:00', link: "https://shorturl.at/uJl78" },
                    { id: "M44", name: 'Month 4', quantity: 8, completed: false, type: "Required", from: '2024-04-01T00:00', to: '2024-04-30T00:00', link: "https://shorturl.at/uJl78" },
                    { id: "M55", name: 'Month 5', quantity: 5, completed: true, type: "Required", from: '2024-05-01T00:00', to: '2024-05-30T00:00', link: "https://shorturl.at/uJl78" },
                    { id: "M66", name: 'Month 6', quantity: 1, completed: false, type: "Required", from: '2024-06-01T00:00', to: '2024-06-30T00:00', link: "https://shorturl.at/uJl78" },
                    { id: "M77", name: 'Month 7', quantity: 2, completed: false, type: "Required", from: '2024-07-01T00:00', to: '2024-07-30T00:00', link: "https://shorturl.at/uJl78" },
                    { id: "M88", name: 'Month 8', quantity: 3, completed: true, type: "Required", from: '2024-08-01T00:00', to: '2024-08-30T00:00', link: "https://shorturl.at/uJl78" },
                    { id: "M99", name: 'Month 9', quantity: 5, completed: false, type: "Required", from: '2024-09-01T00:00', to: '2024-09-30T00:00', link: "https://shorturl.at/uJl78" },
		            { id: "M1010", name: 'Month 10', quantity: 5, completed: false, type: "Required", from: '2024-10-01T00:00', to: '2024-10-30T00:00', link: "https://shorturl.at/uJl78" },
		            { id: "M1111", name: 'Month 11', quantity: 2, completed: false, type: "Required", from: '2024-11-01T00:00', to: '2024-11-30-T00:00', link: "https://shorturl.at/uJl78" },
		            { id: "M1212", name: 'Month 12', quantity: 1, completed: false, type: "Required", from: '2024-12-01T00:00', to: '2024-12-30sT00:00', link: "https://shorturl.at/uJl78" },
                ],
            },
            {
                id: "K33",
                name: 'Student Feedback Collection',
                completed: false,
                score: 10,
                from: '2023-05-01T08:00',
                to: '2023-06-30T17:00',
                typeKPI: KPI_TYPE.WEIGHTED_KPI,
                task: [
                    { id: "T1", name: 'Distribute Survey', weight: 30, completed: false, type: "Required", from: '2024-05-01T08:00', to: '2024-05-10T17:00', link: "https://shorturl.at/uJl78" },
                    { id: "T2", name: 'Collect Responses', weight: 50, completed: true, type: "Required", from: '2024-05-11T08:00', to: '2024-05-20T17:00', link: "https://shorturl.at/uJl78" },
                    { id: "T3", name: 'Analyze Feedback', weight: 20, completed: false, type: "Required", from: '2024-06-29T08:00', to: '2024-06-30T17:00', link: "https://shorturl.at/uJl78" },
                ],
            },
        ]
    },
    {
        id: "G222",
        title: 'Research Publication',
        from: '2023-02-01T09:00',
        to: '2023-08-31T17:00',
        role: 'Researcher',
        description: 'Publish research paper on AI in education',
        kpis: [
            {
                id: "K1",
                name: 'Literature Review',
                completed: true,
                score: 15,
                from: '2023-02-01T09:00',
                to: '2023-04-30T17:00',
                numberOfOptionalsToDo: 1,
                typeKPI: 'TODO_KPI',
                task: [],
            },
            {
                id: "K2",
                name: 'Data Collection',
                completed: true,
                score: 20,
                from: '2023-05-01T09:00',
                to: '2023-06-30T17:00',
                target: 100,
                unit: "samples",
                duration: "2M",
                split: "M",
                typeKPI: 'QUANTITY_KPI',
                task: [],
            },
            {
                id: "K3",
                name: 'Paper Writing',
                completed: true,
                score: 30,
                from: '2023-07-01T09:00',
                to: '2023-08-31T17:00',
                typeKPI: 'WEIGHTED_KPI',
                task: [],
            },
        ]
    },
    {
        id: "G223",
        title: 'Research Private',
        from: '2023-02-01T09:00',
        to: '2023-08-31T17:00',
        role: 'Researcher',
        description: 'Publish research paper on AI in education',
        kpis: [
            {
                id: "K1",
                name: 'Literature Review',
                completed: true,
                score: 15,
                from: '2023-02-01T09:00',
                to: '2023-04-30T17:00',
                numberOfOptionalsToDo: 1,
                typeKPI: 'TODO_KPI',
                task: [],
            },
            {
                id: "K2",
                name: 'Data Collection',
                completed: true,
                score: 20,
                from: '2023-05-01T09:00',
                to: '2023-06-30T17:00',
                target: 100,
                unit: "samples",
                duration: "2M",
                split: "M",
                typeKPI: 'QUANTITY_KPI',
                task: [],
            },
            {
                id: "K3",
                name: 'Paper Writing',
                completed: true,
                score: 30,
                from: '2023-07-01T09:00',
                to: '2023-08-31T17:00',
                typeKPI: 'WEIGHTED_KPI',
                task: [],
            },
        ]
    }

    // Thêm các mục goal khác nếu cần
];

  prompt = RESPONSE_PARSE_PROMPT
    .replace('$today', today)
    .replace('$question', question)
    .replace('$user_data', JSON.stringify(user_data, null, 2))
  console.log(prompt)
  try {
    const response = await together.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "Qwen/Qwen1.5-72B-Chat",
    });

    return res.status(200).json({ role: "user", content: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;

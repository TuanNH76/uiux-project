// src/components/KPIList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KPIList = () => {
    const [kpis, setKpis] = useState([]);

    useEffect(() => {
        const fetchKPIs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/kpis');
                setKpis(response.data);
            } catch (error) {
                console.error('There was an error fetching the KPIs!', error);
            }
        };

        fetchKPIs();
    }, []);

    return (
        <div>
            <h2>KPI List</h2>
            <ul>
                {kpis.map(kpi => (
                    <li key={kpi._id}>
                        <h3>{kpi.title}</h3>
                        <p>{kpi.description}</p>
                        <p>Type: {kpi.type}</p>
                        <p>Start Date: {new Date(kpi.start_date).toLocaleDateString()}</p>
                        <p>End Date: {new Date(kpi.end_date).toLocaleDateString()}</p>
                        {kpi.type === 'recurring' && <p>Frequency: {kpi.frequency}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default KPIList;

import { FormControl, Grid, InputLabel, Menu, MenuItem, Select } from '@mui/material';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Question } from '../../models/question';





const CurrentGame = (props: any) => {

    const database = getDatabase();
    const [questions, setQuestions] = useState([]);
    const [newChange, setNewChange] = useState(false);
    const [selected, setSelected] = useState(1);
    const [curent, setCurent] = useState(new Question());
    
    useEffect(() => {
        const dbQuestions = ref(database, '/');
        onValue(dbQuestions, (snapshot) => {
            const data = snapshot.val();
            if (data.questions !== undefined) {
                setQuestions(data.questions);
                setNewChange(!newChange);
            }
        })

    }, [])
    

    const handleChange = (event: any) => {
        setSelected((event.target.value - 1));
        console.log(selected);
        update(ref(database, "/"), {
            currentQuestion: selected,
        });
    }

    
    return (
        <Grid container spacing={2} sx={{ width: 1 / 2 }}>
            <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="demo-simple-select-label">Intrebare</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selected}
                        label="Numar Intrebare"
                        onChange={handleChange}

                    >
                        {questions.map((q: Question, index) => {
                            return (
                                <MenuItem key={index+1} value={index+1}>{q.text}</MenuItem>
                            )

                        })}
                        <MenuItem key="0" value="0">0</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default CurrentGame;
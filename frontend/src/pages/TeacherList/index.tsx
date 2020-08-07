import React, { useState, FormEvent } from 'react';
import './styles.css'
import PageHeader from '../../components/pageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/input';
import Select from '../../components/Select'
import Api from '../../Services/api';

const TeacherList = () => {

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');
    const [teachers, setTeachers] = useState([]);
   
    async function handleClasses(e: FormEvent) {
        e.preventDefault();
        const response = await Api.get(`classes?week_day=${week_day}&time=${time}&subject=${subject}`);
        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis">
                <form onSubmit={handleClasses} id="search-teachers">
                    <Select
                        label="Matéria"
                        name="subject"
                        onChange={e => { setSubject(e.target.value) }}
                        defaultValue={subject}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Ciencia', label: 'Ciencia' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Ed. Física', label: 'Ed. Física' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'Química', label: 'Química' }
                        ]}
                    />
                    <Select
                        label="Dia da semana"
                        name="week_day"
                        defaultValue={week_day}
                        onChange={e => { setWeek_day(e.target.value) }}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-Feira' },
                            { value: '2', label: 'Terça-Feira' },
                            { value: '3', label: 'Quarta-Feira' },
                            { value: '4', label: 'Quinta-Feira' },
                            { value: '5', label: 'Sexta-Feira' },
                            { value: '6', label: 'Sábado' }
                        ]}
                    />
                    <Input
                        type="time"
                        name="time"
                        defaultValue={time}
                        onChange={e => { setTime(e.target.value);}}
                        label="Hora"
                        id="time" />
                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>
            <main>
                {teachers.map(teacher =>{
                    return(
                        <TeacherItem teacher={teacher}/>
                    )
                })}
               
                
            </main>
        </div>
    )
}


export default TeacherList;
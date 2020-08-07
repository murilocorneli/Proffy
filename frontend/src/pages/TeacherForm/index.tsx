import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/pageHeader';
import './styles.css'
import Input from '../../components/input';
import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import Api from '../../Services/api';



const TeacherForm = () => {

    interface Items{
        week_day: Number,
        from: string,
        to: string
    }
    const [scheduleItems, setScheduleItems] = useState<Items[]>([{
        week_day: 0,
        from: '',
        to: ''
    }]);
   
    const [name, setName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');
    const [avatar, setAvatar] = useState('');

    function addNewScheduleItem() {
          setScheduleItems([...scheduleItems,
             {
                week_day: 0,
                from: '',
                to: '' 
             }])
    }
    function HandleCreateClass(e: FormEvent){
            e.preventDefault();
            Api.post('classes', {
                name,
                avatar,
                whatsapp,
                bio,
                subject,
                cost: Number(cost),
                schedule: scheduleItems
            }).then(()=>{
                alert('cadastro realizado com sucesso.');
            }).catch(()=>{
                alert('erro no cadastro.');
            })
         
    }
    function setScheduleItemValue(index: number, field: string, value: string){
        const newArray = scheduleItems.map((schedule, position)=>{
            if(index===position){
                return {...schedule, [field]: value}
            }
            return schedule;
        })

        setScheduleItems(newArray);
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrível que você quer dar aulas"
                description="O primeiro passo é preencher esse formulário de inscrição." />

            <main>
            <form onSubmit={HandleCreateClass}>
                <fieldset>
                    <legend>Seus dados</legend>
                    <Input type="text" value={name} onChange={event=> setName(event.target.value)} label="Nome Completo" name="name" />
                    <Input type="text" value={avatar} onChange={event=> setAvatar(event.target.value)} label="Avatar" name="avatar" />
                    <Input type="text" value={whatsapp} onChange={event=> setWhatsapp(event.target.value)} label="Whatsapp" name="whatsapp" />
                    <Textarea name="bio" value={bio} onChange={event=> setBio(event.target.value)} label="Biografia" />
                </fieldset>
                <fieldset>
                    <legend>Sobre a aula</legend>
                    <Select onChange={event=> setSubject(event.target.value)}
                        label="Matéria"
                        name="subject"
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
                    <Input value={cost} onChange={event=> setCost(event.target.value)} type="text"  label="Custo da sua hora por aula" name="cost" />
                </fieldset>
                <fieldset>
                    <legend>Horários disponíveis
                <button onClick={addNewScheduleItem} type="button">+ Novo Horário</button>
                    </legend>
                    {scheduleItems.map((schedule, index) => {
                        return(
                        <div key={schedule.week_day as number} className="schedule-item">
                            <Select
                                label="Dia da semana"
                                name="week_day"
                                defaultValue={schedule.week_day as number}
                                onChange={e=> setScheduleItemValue(index, 'week_day', e.target.value)}
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
                            name="from" 
                            label="das" 
                            type="time"
                            value={schedule.from}
                            onChange={e=> setScheduleItemValue(index, 'from', e.target.value)} />
                            <Input 
                            name="to" 
                            label="até" 
                            value={schedule.to}
                            type="time"
                            onChange={e=> setScheduleItemValue(index, 'to', e.target.value)} />
                        </div>
                        );
                    })}


                </fieldset>
                <footer>
                    <p>
                        <img src={warningIcon} alt="aviso importante" />
                    Importante!<br />
                    Preencha todos os dados.
                    <button  type="submit"  >Salvar cadastro</button>
                    </p>
                </footer>
                </form>
            </main>
        </div>
    )
}


export default TeacherForm;
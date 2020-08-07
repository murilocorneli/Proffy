import React from 'react';
import whatsapp from '../../assets/images/icons/whatsapp.svg'
import './styles.css'
import Api from '../../Services/api';

export interface Teacher {
    id: number,
    name: string,
    bio: string,
    avatar: string,
    cost: number,
    whatsapp: string,
    subject: string,

};
interface teacherItem {
    teacher: Teacher,
}

const TeacherItem: React.FC<teacherItem> = (props) => {
    function handleConnection(){
        Api.post('connections', {user_id: props.teacher.id});
    }
    return (
        <article className="teacher-item">
            <header>
                <img src={props.teacher.avatar} alt={props.teacher.name} />
                <div>
                    <strong>{props.teacher.name}</strong>
                    <span>{props.teacher.subject}</span>
                </div>
            </header>
            <p>{props.teacher.bio}</p>
            <footer>
                <p>
                    Preço/hora
          <strong>
                        R${props.teacher.cost}
                    </strong>
                </p>
                <a target="_blank" onClick={handleConnection} href={`https://api.whatsapp.com/send?phone=55${props.teacher.whatsapp}`}>
                    <img src={whatsapp} alt="Whatsapp" />
                     Entrar em contato
                  </a>
            </footer>
        </article>
    )
}

export default TeacherItem;
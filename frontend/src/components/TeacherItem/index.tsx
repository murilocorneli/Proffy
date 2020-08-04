import React from 'react';
import whatsapp from '../../assets/images/icons/whatsapp.svg'
import './styles.css'

const TeacherItem = () => {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/68030796?s=460&u=eb8a417cd0fde887b45805fa386b5e406dec5084&v=4" alt="" />
                <div>
                    <strong>Murilo Corneli</strong>
                    <span>Tecnologia da informação</span>
                </div>
            </header>
            <p>Um texto qualquer baseado na descrição que o professor colocar <br /> cada professor faz e a hora e tals</p>
            <footer>
                <p>
                    Preço/hora
          <strong>
                        R$ 80,00
          </strong>
                </p>
                <button>
                    <img src={whatsapp} alt="Whatsapp" />
          Entrar em contato
      </button>
            </footer>
        </article>
    )
}

export default TeacherItem;
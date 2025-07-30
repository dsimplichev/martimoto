import './contact.css';
import SectionHeader from '../../Card/SectionHeader';

function Contact() {
    return (
        <div className="contact-page">
            <SectionHeader title="За контакти" />


            <div className="contact-info">
                <p><strong>Адрес:</strong> бул. Христо Ботев 42, Плевен, България</p>
                <p><strong>Имейл:</strong> info@martimoto.bg</p>
                <p><strong>Телефон:</strong> +359 882 455 838</p>
                <p><strong>Работно време:</strong> Пон-Пет: 9:00 - 18:00</p>
                <p>Събота: 9:00 - 14:00</p>
                <p>Неделя: Почивен ден</p>
            </div>
        </div>
    );
}

export default Contact;
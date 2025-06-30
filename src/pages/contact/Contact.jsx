import './contact.css';

function Contact() {
    return (
        <div className="contact-page">
            <div className="header-section3">
                <h2 className="contact-title">За контакти</h2>
            </div>
            
            <div className="divider"></div>
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
(function(){
    emailjs.init("2VmQUlQguWFLEsr_S");
})();

function generateICS(event) {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your Organization//Your Product//EN
BEGIN:VEVENT
UID:${event.id}
DTSTAMP:${event.timestamp}
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.summary}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    return icsContent;
}

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const templateParams = {
        name: formData.get('name'),
        email: formData.get('email'),
        sunday_date: formData.get('sunday_date'),
        sunday_start_time: formData.get('sunday_start_time'),
        sunday_end_time: formData.get('sunday_end_time'),
        monday_date: formData.get('monday_date'),
        monday_start_time: formData.get('monday_start_time'),
        monday_end_time: formData.get('monday_end_time'),
        tuesday_date: formData.get('tuesday_date'),
        tuesday_start_time: formData.get('tuesday_start_time'),
        tuesday_end_time: formData.get('tuesday_end_time'),
        wednesday_date: formData.get('wednesday_date'),
        wednesday_start_time: formData.get('wednesday_start_time'),
        wednesday_end_time: formData.get('wednesday_end_time'),
        thursday_date: formData.get('thursday_date'),
        thursday_start_time: formData.get('thursday_start_time'),
        thursday_end_time: formData.get('thursday_end_time'),
        friday_date: formData.get('friday_date'),
        friday_start_time: formData.get('friday_start_time'),
        friday_end_time: formData.get('friday_end_time'),
        saturday_date: formData.get('saturday_date'),
        saturday_start_time: formData.get('saturday_start_time'),
        saturday_end_time: formData.get('saturday_end_time')
    };

    const eventData = {
        id: '12345',
        timestamp: new Date().toISOString().replace(/[-:]/g, '').split('.') + 'Z',
        start: templateParams.sunday_date + 'T' + templateParams.sunday_start_time.replace(':', '') + '00Z',
        end: templateParams.sunday_date + 'T' + templateParams.sunday_end_time.replace(':', '') + '00Z',
        summary: 'Availability Submission',
        description: 'Weekly availability submission.',
        location: 'Online',
        email: templateParams.email
    };

    const icsContent = generateICS(eventData);
    const base64ICS = btoa(icsContent); // Convert ICS content to Base64

    emailjs.send('service_9k0m9i6', 'template_f0ku5d2', {
        to_email: templateParams.email,
        subject: 'Event Invitation',
        message: 'Please find the event details attached.',
        attachment: base64ICS,
        ...templateParams
    }).then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
    }).catch((error) => {
        console.error('Failed to send email:', error);
    });
});

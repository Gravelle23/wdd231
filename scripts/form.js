 const params = new URLSearchParams(window.location.search);
    const outputDiv = document.getElementById('output');

    const name = params.get('name') || 'Not provided';
    const email = params.get('email') || 'Not provided';
    const age = params.get('age') || 'Not provided';
    const dob = params.get('dob') || 'Not provided';
    const subscription = params.get('subscription') || 'Not provided';
    const updates = params.has('updates') ? 'Yes' : 'No';

    outputDiv.innerHTML = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Date of Birth:</strong> ${dob}</p>
      <p><strong>Subscription:</strong> ${subscription}</p>
      <p><strong>Receive Updates:</strong> ${updates}</p>
    `;
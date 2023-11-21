const axios = require("axios");

/** Receives a phone number, queries HUBSPOT and returns the customer record.
* If the CRM has a duplicate number, the function returns the first record (usually the oldest)
*/
exports.handler = async function (context, event, callback) {
  let result = {
    crmid: '',
    firstname: '',
    lastname: '',
    fullname: ''
  };
  let from = event.from;

  //if the string from contains a whatsapp prefix we need to remove it
  from = from.replace('whatsapp:', '');
  axios({
    url: `https://api.hubapi.com/crm/v3/objects/contacts`,
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.HUBSPOT_TOKEN}`
    },
    data: {
      properties: {
        firstname: 'Anonymous',
        lastname: 'Contact',
        phone: from,
        hs_lead_status: 'NEW',
        tipo_de_lead: 'Llamada',
      }
    }
  }).then(function (response) {
    let contact = response.data;
    console.log(contact, response.data)
    //the result object stores the data you need from hubspot. In this example we're returning the CRM ID, first name and last name only.
    result.crmid = `${contact.id}`; //required for screenpop
    result.firstname = `${contact.properties.firstname}`;
    result.lastname = `${contact.properties.lastname}`;
    result.fullname = `${contact.properties.firstname ?? ''} ${contact.properties.lastname ?? ''}`;
    if (result.fullname.trim() == '') {
      result.fullname = 'Customer'
    }

    console.log('RESULT', result);
    
    callback(null, result);
  })
    .catch(function (error) {
      // handle error
      console.log(`Error: ${error}`);
      callback(null, error);
    });
};


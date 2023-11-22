# HubspotFetchContact

Funcion serverless de Twilio para obtener detalles de un contacto o crearlo en hubspot.

## Usar
### Campos Fetch
```js
  let result = {
    crmid: '',
    firstname: '',
    lastname: '',
    fullname: '',
    lifecyclestage: 'lead'
  };
  ```

### Campos Create
```js
{
      properties: {
        firstname: 'Anonymous',
        lastname: 'Contact',
        phone: from,
        hs_lead_status: 'NEW',
        tipo_de_lead: 'Llamada',
      }
    }
```

## @todo
* Hacer dinamicos los parametros con los que se crea el contacto
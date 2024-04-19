axios.get(`${BaseURL}/api/basedata/causes/all`,
        { 
        params:{
            event_type_id: props.eventType
        },
        headers: {  
            Authorization: `Bearer ${props}`,
            },
    })
        .then((response) => {
          console.log(response.data)
          return response.data
        })
        .catch((error) => {
          alert(`Error fetching causes: ${error}`);
        });
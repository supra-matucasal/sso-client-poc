const apiUrl = process.env.NEXT_PUBLIC_API_URL;



async function getEvents(token: string): Promise<any> {
  try {
    // I want this items/events /items/events?limit=10&page=1&fields=*,user_id.*
    //const response = await fetch(`${apiUrl}/items/events`, {
    const response = await fetch(`${apiUrl}/items/events?limit=10&page=1&fields=*,user_id.*`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.status === 200 ) {
      return response.json();
    
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
}


export {
  getEvents,
}
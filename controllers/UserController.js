//function to insert data to database
export const insertUserData = async (userData) => {
  try {
    const response = await fetch('http://10.0.2.2:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      console.error(`Server responded with status code ${response.status}`);
      const text = await response.text();
      return { success: false, message: `Server error: ${text}` };
    }
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const result = await response.json();
      console.log('Server Response:', result);
      return { success: true, data: result };
    } else {
      const text = await response.text();
      console.error('Non-JSON response from server:', text);
      return { success: false, message: `Non-JSON response: ${text}` };
    }
  } catch (error) {
    console.error('Error adding user to server:', error);
    return { success: false, message: 'Network or server error occurred' };
  }
};

//function to get user by ID from database
export const getUserByID = async (userID) => {
    try {
        const response = await fetch(`http://10.0.2.2:3000/login/${userID}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching user from server:', error);
      }
};

import request from 'superagent';

const URL = 'https://aqueous-refuge-70411.herokuapp.com';

export async function signUp(email, password) {
    const response = await request
        .post(`${URL}/auth/signup`)
        .send({ 'email': email, 'password': password })

        return response.body;
}

export async function logIn(email, password) {
    const response = await request  
        .post(`${URL}/auth/signin`)
        .send({'email': email, 'password': password})
        return response.body;
}
export async function getTodos(token) {
    const response = await request
        .get(`${URL}/api/todos`)
        .set('Authorization', token)

        return response.body;
}

export async function createTodo(todoItem, token) {
    const response = await request  
        .post(`${URL}/api/todos`)
        .send({'todo': todoItem})
        .set('Authorization', token)

        return response.body;
}

export async function updateTodo(id, completed, token) {
    const response = await request
        .put(`${URL}/api/todos/${id}`)
        .send({'completed': completed})
        .set('Authorization', token)

        return response.body;
}
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const API_URL = 'http://localhost:3001';

class HttpService {
  private async sendHttpRequest(path: string, method: HTTPMethod, data?: any, options?: any): Promise<any> {
    let requestOptions = { method, ...options };

    console.log(path);
    console.log(data);
    console.log(method);
    if (data) {
      requestOptions = {
        ...requestOptions,
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: data ? JSON.stringify(data) : null,
      };      
    }

    const response = await window.fetch(`${API_URL}/${path}`, requestOptions);
    return response.json();
  }

  async get(path: string, options?: any): Promise<any> {
    return this.sendHttpRequest(path, 'GET', null, options);
  }

  async post(path: string, data: any, options?: any): Promise<any> {
    return this.sendHttpRequest(path, 'POST', data, options);
  }

  async put(path: string, data: any, options?: any): Promise<any> {
    return this.sendHttpRequest(path, 'PUT', data, options);
  }

  async delete(path: string, options?: any): Promise<any> {
    return this.sendHttpRequest(path, 'DELETE', null, options);
  }
}

export default new HttpService();

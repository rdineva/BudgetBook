type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const API_URL = 'http://localhost:3000';

class HttpService {
  private async sendHttpRequest(path: string, method: HTTPMethod, data?: any, options?: any): Promise<any> {
    let requestOptions = { method, ...options };

    if (data) {
      requestOptions = { ...requestOptions, body: data };
    }
    console.log(requestOptions)
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

export const httpService = new HttpService();
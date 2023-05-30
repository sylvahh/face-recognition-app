export async function makeApiRequest(url, method, body, token) {
  try {
    const baseUrl = 'https://face-recognition-api-omega.vercel.app';
    let headers = { 'Content-Type': 'application/json' };
    headers.Accept = 'application/json';
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    let options = {
      method: method,
      headers: headers,
    };
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      options.body = JSON.stringify(body);
    }
    let response = await fetch(baseUrl + url, options);
    let data = await response.json();
    if (!response.ok) {
      throw new Error();
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}




export function calculateBoundingBox(data) {
  const image = document.getElementById('imageInput');
  const width = Number(image.width);
  const height = Number(image.height);

  const values = ({ region_info }) => {
    const { left_col, top_row, right_col, bottom_row } = region_info.bounding_box || {};
    return {
      left: left_col * width,
      top: top_row * height,
      right: width - right_col * width,
      bottom: height - bottom_row * height,
    };
  };
  const mappedValues = data.map(values);
  return mappedValues;
}

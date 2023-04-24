export async function makeApiRequest(url, method, body, token) {
  try {
    const baseUrl = 'http://localhost:3001';
    let headers = { "Content-Type": "application/json",  };
   headers.Accept =  "application/json"
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    let options = {
      method: method,
      headers: headers,
    };
    if (method === "POST" || method === "PUT" || method === "PATCH") {
      options.body = JSON.stringify(body);
    }
    let response = await fetch(baseUrl + url, options);
    let data = await response.json();
    if (!response.ok) {
      throw new Error();
      
    }
    return data;
  } catch (error) {
    console.log(error)
    throw error;
  }
}











export const makeRequest = async (imageURL) => {
  try {
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'dc19eedad9c345169ecc11effcc101ed';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'iv1dt6zvad3t';
    const APP_ID = 'facereqid';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    // const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';
    const IMAGE_URL = imageURL;

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Key ' + PAT,
      },
      body: raw,
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    let response = await fetch(
      'https://api.clarifai.com/v2/models/' + MODEL_ID + '/outputs',
      requestOptions
    );
    let data = await response.json();
    if (!response.ok) {
      throw new Error(data.outputs[0].status.description);
    }
    return findValue(data, 'regions');
  } catch (error) {
    throw error;
  }
};

export function findValue(obj, firstKey) {
  const boundingBoxes = [];
  for (let k in obj) {
    if (k === firstKey) {
      return obj[k];
    } else if (typeof obj[k] === 'object') {
      const result = findValue(obj[k], firstKey);
      if (result) {
        result.forEach((info) => {
          boundingBoxes.push(info);
        });
        return boundingBoxes;
      }
    }
  }
  return null;
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

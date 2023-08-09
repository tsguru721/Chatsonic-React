import api from '../utils/api';
import axios from 'axios';
import { setAlert } from './alert';
import {
  SEARCH_SUCCESS,
  SEARCH_NOW,
  SET_HISTORY,
  NEW_CHAT,
  UPDATE_CHAT,
  EXCHANGE_CURRENT_ITEM
} from './types';

// Add new chat box
export const newChatBox =
  (currentItem, searchQueries, searchResults, searchHistory) =>
  async (dispatch) => {
    if (searchQueries.length === 0 || searchResults.length === 0) {
      dispatch(setAlert('Please search any data', 'danger'));
    } else {
      if (currentItem > searchHistory.length) {
        dispatch({
          type: NEW_CHAT,
          payload: {
            currentItem: currentItem,
            searchQueries: searchQueries,
            searchResults: searchResults
          }
        });
      } else {
        let searchHis = searchHistory;
        searchHis[currentItem] = {
          searchQueries: searchQueries,
          searchResults: searchResults
        };
        dispatch({
          type: UPDATE_CHAT,
          payload: { searchHis: searchHis, nextItemNum: searchHis.length + 1 }
        });
      }
    }
  };

export const exchangeCurrentItem = (key) => async (dispatch) => {
  dispatch({
    type: EXCHANGE_CURRENT_ITEM,
    payload: key
  });
};
// Add comment
export const askToChatsonic = (formData, email) => async (dispatch) => {
  const res = await api.post('/subscribe/checkSubscribe', { email: email });

  if (res.data.nonSubscribe === true) {
    dispatch(
      setAlert('Please subscribe free trial or premium subscribe.', 'success')
    );
  } else if (
    res.data.nonSubscribe === false &&
    (res.data.subscribe.subscribe === 0 || res.data.subscribe.subscribe === 1)
  ) {
    let subscribedData = new Date(res.data.subscribe.updatedAt);
    let today = new Date();
    let subtractMiliSecond = today - subscribedData;
    let substractData = parseInt(subtractMiliSecond / 3600000 / 24);
    if (substractData > 30) {
      await api.post('/subscribe/unSubscribe', {
        email: email
      });
      if (substractData) dispatch(setAlert('Subscription End', 'danger'));
    }
    const { input_text, promptList } = formData;
    try {
      let searchResult = {};
      let inputValue = input_text;
      let promptsInSearchEvent = '';
      let searchKeywardWithPrompts = '';
      promptList.forEach((value) => {
        promptsInSearchEvent += ' ' + value;
      });
      // promptList.map((value, index) => {
      //   promptsInSearchEvent += ' ' + value;
      // });
      searchKeywardWithPrompts =
        // 'Write a succinct and factual answer for legal professionals with the goal of providing relevant five precedents and providing five reference to the source of the information' +
        promptsInSearchEvent + ' ' + inputValue;
      dispatch({
        type: SEARCH_NOW,
        payload: inputValue
      });
      // Begin of axios
      axios
        .post(
          'https://api.writesonic.com/v2/business/content/chatsonic?engine=premium',
          {
            enable_google_results: true,
            enable_memory: true,
            // history_data: [{ newKey: 'New Value' }],
            input_text: searchKeywardWithPrompts
          },
          {
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              'X-API-KEY': '39a7d8bc-80b2-4764-96e2-81ed1667b5a5'
            }
          }
        )
        .then(function (response) {
          searchResult = response;
          if (searchResult.data.message) {
            let message = searchResult.data.message;

            const paragraphs = message.split('\n\n'); // Split the text into paragraphs

            let formattedText = '';
            for (const p of paragraphs) {
              let includesA = p.includes('<br>');
              if (includesA)
                formattedText += `${p}`; // Add paragraph tags to each paragraph
              else formattedText += `<p>${p}</p>`; // Add paragraph tags to each paragraph
            }

            dispatch({
              type: SEARCH_SUCCESS,
              payload: formattedText
            });
            dispatch({
              type: SET_HISTORY,
              payload: formattedText
            });

            dispatch(setAlert('Searching Success !', 'success'));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      // End of axios
    } catch (err) {
      console.log(err);
    }
  } else if (
    res.data.subscribe.subscribe === 2 &&
    res.data.nonSubscribe === false
  ) {
    dispatch(setAlert('Subscribe is finished.', 'danger'));
  }
};

const makePredictionRequest = async (inputData, gtoken) => {
  try {
    const projectId = 'lawsearch-test';
    const location = 'us-central1';
    const modelId = 'chat-bison@001';
    const endpoint = `https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${modelId}:predict`;
    const accessToken = gtoken;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    const data = {
      instances: [
        {
          context:
            'Please provide the searcher with examples of legal cases that are similar to theirs or have been used as precedent for similar cases. Only provide examples of cases that are available on publicly available databases. Provide links to these cases where possible. Please present in bullet point format (a bullet point per case).',
          examples: [],
          messages: [
            {
              author: 'user',
              content: inputData
            }
          ]
        }
      ],
      parameters: {
        temperature: 0,
        maxOutputTokens: 1024
        // "topP": 0.8,
        // "topK": 40
      }
    };

    const response = await axios.post(endpoint, data, { headers });
    // console.log(
    //   'Prediction result',
    //   response.data.predictions[0].candidates[0].content
    // );
    return response.data.predictions[0].candidates[0].content;
  } catch (error) {
    console.error('Error making prediction request:', error);
    throw error;
  }
};

export const askToGoogleVertex =
  (formData, email, gtoken, searchQueries) => async (dispatch) => {
    const res = await api.post('/subscribe/checkSubscribe', { email: email });

    if (res.data.nonSubscribe === true) {
      dispatch(
        setAlert('Please subscribe free trial or premium subscribe.', 'success')
      );
    } else if (
      res.data.nonSubscribe === false &&
      (res.data.subscribe.subscribe === 0 || res.data.subscribe.subscribe === 1)
    ) {
      let subscribedData = new Date(res.data.subscribe.updatedAt);
      let today = new Date();
      let subtractMiliSecond = today - subscribedData;
      let substractData = parseInt(subtractMiliSecond / 3600000 / 24);
      if (substractData > 30) {
        await api.post('/subscribe/unSubscribe', {
          email: email
        });
        if (substractData) dispatch(setAlert('Subscription End', 'danger'));
      }
      const { input_text, promptList } = formData;
      try {
        let inputValue = input_text;
        let promptsInSearchEvent = '';
        let searchQueriyHistory = '';
        let searchKeywardWithPrompts = '';
        promptList.forEach((value) => {
          promptsInSearchEvent += ' ' + value;
        });
        searchQueries.forEach((value) => {
          searchQueriyHistory += ' ' + value;
        });
        // promptList.map((value, index) => {
        //   promptsInSearchEvent += ' ' + value;
        // });
        searchKeywardWithPrompts =
          // 'Write a succinct and factual answer for legal professionals with the goal of providing relevant five precedents and providing five reference to the source of the information' +
          promptsInSearchEvent + searchQueriyHistory + ' ' + inputValue;
        dispatch({
          type: SEARCH_NOW,
          payload: inputValue
        });
        const vertexResult = await makePredictionRequest(
          searchKeywardWithPrompts,
          gtoken
        );
        if (vertexResult) {
          const paragraphs = vertexResult.split('\n'); // Split the text into paragraphs

          let formattedText = '';
          for (const p of paragraphs) {
            let includesA = p.includes('<br>');
            if (includesA)
              formattedText += `${p}`; // Add paragraph tags to each paragraph
            else formattedText += `<p>${p}</p>`; // Add paragraph tags to each paragraph
          }
          dispatch({
            type: SEARCH_SUCCESS,
            payload: formattedText
          });
          dispatch({
            type: SET_HISTORY,
            payload: { vertexResult: vertexResult, query: inputValue }
          });
        }
        // End of axios
      } catch (err) {
        console.log(err);
      }
    } else if (
      res.data.subscribe.subscribe === 2 &&
      res.data.nonSubscribe === false
    ) {
      dispatch(setAlert('Subscribe is finished.', 'danger'));
    }
  };

export const askToOpenai =
  (formData, email, openAiKey, searchQueries) => async (dispatch) => {
    const res = await api.post('/subscribe/checkSubscribe', { email: email });

    if (res.data.nonSubscribe === true) {
      dispatch(
        setAlert('Please subscribe free trial or premium subscribe.', 'success')
      );
    } else if (
      res.data.nonSubscribe === false &&
      (res.data.subscribe.subscribe === 0 || res.data.subscribe.subscribe === 1)
    ) {
      let subscribedData = new Date(res.data.subscribe.updatedAt);
      let today = new Date();
      let subtractMiliSecond = today - subscribedData;
      let substractData = parseInt(subtractMiliSecond / 3600000 / 24);
      if (substractData > 30) {
        await api.post('/subscribe/unSubscribe', {
          email: email
        });
        if (substractData) dispatch(setAlert('Subscription End', 'danger'));
      }
      const { input_text, promptList } = formData;
      try {
        let inputValue = input_text;
        let promptsInSearchEvent = '';
        let searchQueriyHistory = '';
        let searchKeywardWithPrompts = '';
        promptList.forEach((value) => {
          promptsInSearchEvent += ' ' + value;
        });
        searchQueries.forEach((value) => {
          searchQueriyHistory += ' ' + value;
        });
        // promptList.map((value, index) => {
        //   promptsInSearchEvent += ' ' + value;
        // });
        searchKeywardWithPrompts = searchQueriyHistory + ' ' + inputValue;
        // searchKeywardWithPrompts =
        //   // 'Write a succinct and factual answer for legal professionals with the goal of providing relevant five precedents and providing five reference to the source of the information' +
        //   promptsInSearchEvent + searchQueriyHistory + ' ' + inputValue;
        dispatch({
          type: SEARCH_NOW,
          payload: inputValue
        });
        axios
          .post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'gpt-3.5-turbo',
              messages: [
                {
                  role: 'system',
                  content: searchKeywardWithPrompts
                },
                {
                  role: 'user',
                  content:
                    'Content should be for attorneys and law experts. These attorneys are looking to find similar cases or precedents to legal predicaments so that they can get an initial view of relevant cases that could help them serve their client in their lawsuit.'
                },
                {
                  role: 'user',
                  content:
                    'Please respond with full annd factual case names and summaries of the factual cases. Do not present hypothetical cases. Long responses please. Please remain neutral with regards to opinion. Do not use hypothetical answers. Long response.'
                }
              ]
            },
            {
              headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer ' + openAiKey
              }
            }
          )
          .then(function (response) {
            let result = response.data.choices[0].message.content;
            // console.log('response', response.data.choices[0].message.content);
            if (result) {
              const paragraphs = result.split('\n'); // Split the text into paragraphs

              let formattedText = '';
              for (const p of paragraphs) {
                let includesA = p.includes('<br>');
                if (includesA)
                  formattedText += `${p}`; // Add paragraph tags to each paragraph
                else formattedText += `<p>${p}</p>`; // Add paragraph tags to each paragraph
              }
              dispatch({
                type: SEARCH_SUCCESS,
                payload: formattedText
              });
              dispatch({
                type: SET_HISTORY
                // payload: { vertexResult: response, query: inputValue }
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });

        // End of axios
      } catch (err) {
        console.log(err);
      }
    } else if (
      res.data.subscribe.subscribe === 2 &&
      res.data.nonSubscribe === false
    ) {
      dispatch(setAlert('Subscribe is finished.', 'danger'));
    }
  };

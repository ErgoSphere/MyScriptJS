import { recognizerLogger as logger } from '../configuration/LoggerConfig';

/**
 * Recognizer context
 * @typedef {Object} RecognizerContext
 * @property {Array<RecognitionContext>} recognitionContexts
 * @property {Promise} initPromise
 * @property {RecognitionPositions} lastRecognitionPositions  Last recognition sent/received stroke indexes.
 * @property {String} url
 * @property {String} suffixUrl
 * @property {WebSocket} websocket
 * @property {Options} options
 * @property {function} callback
 * @property {Number} currentReconnectionCount
 */

/**
 * Create a new recognizer context
 * @return {RecognizerContext} An object that contains all recognizer context
 */
export function createEmptyRecognizerContext() {
  return {
    // websocket
    recognitionContexts: [],
    initPromise: undefined,
    lastRecognitionPositions: {
      lastSentPosition: -1,
      lastReceivedPosition: -1
    },
    url: undefined,
    suffixUrl: undefined,
    websocket: undefined,
    options: undefined,
    callback: undefined,
    currentReconnectionCount: undefined
  };
}

/**
 * Reset the recognition context positions
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @return {RecognizerContext}
 */
export function resetRecognitionPositions(recognizerContext, model) {
  const recognizerContextReference = recognizerContext;
  recognizerContextReference.lastRecognitionPositions.lastSentPosition = -1;
  recognizerContextReference.lastRecognitionPositions.lastReceivedPosition = -1;
  const modelReference = model;
  modelReference.lastRecognitionPositions.lastSentPosition = -1;
  modelReference.lastRecognitionPositions.lastReceivedPosition = -1;
  logger.debug('Reset recognition positions');
  return recognizerContextReference;
}

/**
 * Update the recognition context sent position
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @return {RecognizerContext}
 */
export function updateSentRecognitionPositions(recognizerContext, model) {
  const modelRef = model;
  modelRef.lastRecognitionPositions.lastSentPosition = modelRef.rawStrokes.length - 1;
  const recognizerContextRef = recognizerContext;
  recognizerContextRef.lastRecognitionPositions.lastSentPosition = modelRef.lastRecognitionPositions.lastSentPosition;
  return recognizerContextRef;
}

/**
 * Test if it should attempt immediate reconnect
 * @param {RecognizerContext} recognizerContext
 * @return {Boolean} True if should attempt reconnect, false otherwise
 */
export function shouldAttemptImmediateReconnect(recognizerContext) {
  const recognizerContextRef = recognizerContext;
  return recognizerContextRef.websocket.autoReconnect === true && recognizerContextRef.currentReconnectionCount++ <= recognizerContextRef.websocket.maxRetryCount;
}

/**
 * Lost connection message
 * @type {{type: string}}
 */
export const LOST_CONNEXION_MESSAGE = { type: 'LOST_CONNECTION' };


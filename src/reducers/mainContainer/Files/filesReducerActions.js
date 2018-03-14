import { FILE_ACTIONS } from '../../../utils/constants/actionConstants';

const { 
    LIST_FILES,
    UPLOAD_FILE_START,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_ERROR,
    DOWNLOAD_FILE_SUCCESS,
    DOWNLOAD_FILE_ERROR,
    DELETE_FILE, 
    SELECT_FILE, 
    DESELECT_FILE,
    UPDATE_FILE_UPLOAD_PROGRESS,
    UPDATE_FILE_DOWNLOAD_PROGRESS,
    FILE_DOWNLOAD_CANCELED,
    FILE_UPLOAD_CANCELED,
    LIST_UPLOADING_FILES,
    FILE_UPDATE_FAVOURITE
} = FILE_ACTIONS;

/**
 * 
 * @param {string} bucketId 
 * @param {ListItemModel[]} files 
 */
function listFiles(bucketId, files) {
    return { type: LIST_FILES, payload: { bucketId, files } };
}

/**
 * @param {string} bucketId 
 * @param {ListItemModel} file
 */
function uploadFileStart(bucketId, file) {
    return { type: UPLOAD_FILE_START, payload: { bucketId, file } };
}

/**
 * 
 * @param {string} bucketId
 * @param {ListItemModel} file
 * @param {ListItemModel} filePath
 */
function uploadFileSuccess(bucketId, file, filePath) {
    return { type: UPLOAD_FILE_SUCCESS, payload: { bucketId, file, filePath } };
}

/**
 * 
 * @param {string} bucketId
 * @param {string} filePath
 */
function uploadFileError(fileHandle) {
    return { type: UPLOAD_FILE_ERROR, payload: { fileHandle } };
}

function updateFileUploadProgress(fileHandle, progress, uploaded) {
    return { type: UPDATE_FILE_UPLOAD_PROGRESS, payload: { fileHandle, progress, uploaded } }
}

/**
 * Occurs when file downloading ends successfully 
 * @param {string} bucketId
 * @param {string} fileId
 */
function downloadFileSuccess(bucketId, fileId, filePath) {
    return { type: DOWNLOAD_FILE_SUCCESS, payload: { bucketId, fileId, filePath } };
}

/**
 * Occurs when file downloading fails
 * @param {string} bucketId
 * @param {string} fileId
 */
function downloadFileError(bucketId, fileId) {
    return { type: DOWNLOAD_FILE_ERROR, payload: { bucketId, fileId } };
}

/**
 * Occurs when file downloading fails
 * @param {string} bucketId
 * @param {string} fileId
 * @param {string} progress - current progress of downloading
 * @param {string} fileRef - reference of file downloading state. Needed for canceling download
 */
function updateFileDownloadProgress(bucketId, fileId, progress, fileRef) {
    return { type: UPDATE_FILE_DOWNLOAD_PROGRESS, payload: { bucketId, fileId, progress, fileRef } }
}

/**
 * Occurs when file downloading canceled
 * @param {string} fileRef - reference of file downloading state. Needed for canceling download
 */
function fileDownloadCanceled(bucketId, fileId) {
    return { type: FILE_DOWNLOAD_CANCELED, payload: { bucketId, fileId } }
}

function fileUploadCanceled(bucketId, fileId) {
    return { type: FILE_UPLOAD_CANCELED, payload: { bucketId, fileId } }
}

function deleteFile(bucketId, fileId) {
    return { type: DELETE_FILE, payload: { bucketId, fileId } };
}

function selectFile(file) {
    return { type: SELECT_FILE, payload: { file } };
}

function deselectFile(file) {
    return { type: DESELECT_FILE, payload: { file } };
}

//list component
function enableSelectionMode() {
    return { type: ENABLE_SELECTION_MODE };
}

function listUploadingFiles(uploadingFiles) {
    return { type: LIST_UPLOADING_FILES, payload: { uploadingFiles } };
}

function updateFavouriteFiles(files) {
    return { type: FILE_UPDATE_FAVOURITE, payload: { files } } 
}

export const filesListContainerFileActions = {
    listFiles,
    selectFile,
    deselectFile,
    fileDownloadCanceled,
    fileUploadCanceled
};

export const mainContainerFileActions = {
    uploadFileStart,
    uploadFileSuccess,
    uploadFileError,
    updateFileUploadProgress,
    downloadFileSuccess,
    downloadFileError,
    updateFileDownloadProgress,
    deleteFile,
    fileUploadCanceled
};

export const imageViewerActions = {
    deleteFile
};

const allFileActions = {
    uploadFileStart,
    uploadFileSuccess,
    uploadFileError,
    updateFileUploadProgress,
    downloadFileSuccess,
    downloadFileError,
    updateFileDownloadProgress,
    deleteFile,
    listFiles,
    selectFile,
    deselectFile,
    fileDownloadCanceled,
    fileUploadCanceled,
    listUploadingFiles
};

export const favouritesFileActions = {
    updateFavouriteFiles
}

export default allFileActions;
package storjlib.services;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.database.sqlite.SQLiteDatabase;
import android.os.IBinder;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.List;

import storjlib.GsonSingle;
import storjlib.dataprovider.DatabaseFactory;
import storjlib.dataprovider.repositories.BucketRepository;
import storjlib.dataprovider.repositories.FileRepository;
import storjlib.models.PromiseHandler;

/**
 * Created by Yaroslav-Note on 3/6/2018.
 */

public class ServiceModule extends ReactContextBaseJavaModule {

    public final static String GET_SERVICE = "storjlib.services.GetBucketsService";
    public final static String UPLOAD_SERVICE = "storjlib.services.UploadService";
    public final static String GET_BUCKETS = "GET_BUCKETS";
    public final static String GET_FILES = "GET_FILES";
    public final static String BUCKET_CREATED = "BUCKET_CREATED";
    public final static String BUCKET_DELETED = "BUCKET_DELETED";
    public final static String FILE_DELETED = "FILE_DELETED";

    private final SQLiteDatabase _db;
    private final BucketRepository _bRepository;
    private final FileRepository _fRepository;

    private GetBucketsService mGetBucketsService;
    private UploadService mUploadService;
    private DownloadService mDownloadService;

    private PromiseHandler mPromise;
    private PromiseHandler mUploadServicePromise;
    private PromiseHandler mDownloadServicePromise;

    private final ServiceConnection mConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            BaseReactService baseReactService = ((BaseReactService.BaseReactServiceBinder)service).getService();
            baseReactService.setReactContext(getReactApplicationContext());

            String serviceName = name.getClassName();

            switch (serviceName) {
                case GET_SERVICE:
                    connectService(mPromise, mGetBucketsService, baseReactService, serviceName);
                    break;
                case UPLOAD_SERVICE:
                    connectService(mUploadServicePromise, mUploadService, baseReactService, serviceName);
                    break;
                case DownloadService.SERVICE_NAME:
                    connectService(mDownloadServicePromise, mDownloadService, baseReactService, serviceName);
            }
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            switch (name.getClassName()) {
                case GET_SERVICE:
                    mGetBucketsService = null;
                    break;
                case UPLOAD_SERVICE:
                    mUploadService = null;
                    break;
                case DownloadService.SERVICE_NAME:
                    mDownloadService = null;
                    break;
            }
        }
    };

    public ServiceModule(ReactApplicationContext reactContext)
    {
        super(reactContext);
        _db = new DatabaseFactory(getReactApplicationContext(), null).getWritableDatabase();
        _fRepository = new FileRepository(_db);
        _bRepository = new BucketRepository(_db);
        mPromise = new PromiseHandler();
        mUploadServicePromise = new PromiseHandler();
        mDownloadServicePromise = new PromiseHandler();
    }

    @Override
    public String getName() {
        return "ServiceModule";
    }

    @ReactMethod
    public void bindGetBucketsService(Promise promise) {
        bindService(mPromise, GetBucketsService.class, promise);
    }

    @ReactMethod
    public void bindUploadService(Promise promise) {
        bindService(mUploadServicePromise, UploadService.class, promise);
    }

    @ReactMethod
    public void bindDownloadService(Promise promise) {
        bindService(mDownloadServicePromise, DownloadService.class, promise);
    }

    @ReactMethod
    public void getBuckets() {
        Intent serviceIntent = new Intent(getReactApplicationContext(), GetBucketsService.class);
        serviceIntent.setAction(GET_BUCKETS);

        getReactApplicationContext().startService(serviceIntent);
    }

    @ReactMethod
    public void uploadFile(String bucketId, String uri) {
        if(bucketId == null || uri == null) {
            return;
        }

        Intent uploadIntent = new Intent(getReactApplicationContext(), UploadService.class);
        uploadIntent.setAction(UploadService.ACTION_UPLOAD_FILE);
        uploadIntent.putExtra(UploadService.PARAMS_BUCKET_ID, bucketId);
        uploadIntent.putExtra(UploadService.PARAMS_URI, uri);

        getReactApplicationContext().startService(uploadIntent);
    }

    @ReactMethod
    public void downloadFile(String bucketId, String fileId, String localPath) {
        if(bucketId == null || localPath == null || fileId == null) {
            return;
        }

        Intent downloadIntent = new Intent(getReactApplicationContext(), DownloadService.class);
        downloadIntent.setAction(DownloadService.ACTION_DOWNLOAD_FILE);
        downloadIntent.putExtra(DownloadService.PARAMS_BUCKET_ID, bucketId);
        downloadIntent.putExtra(DownloadService.PARAMS_FILE_ID, fileId);
        downloadIntent.putExtra(DownloadService.PARAMS_LOCAL_PATH, localPath);

        getReactApplicationContext().startService(downloadIntent);
    }

    @ReactMethod
    public void getFiles(String bucketId) {
        Intent serviceIntent = new Intent(getReactApplicationContext(), GetBucketsService.class);
        serviceIntent.setAction(GET_FILES);
        serviceIntent.putExtra("bucketId", bucketId);

        getReactApplicationContext().startService(serviceIntent);
    }

    @ReactMethod
    public void createBucket(final String bucketName) {
        Intent serviceIntent = new Intent(getReactApplicationContext(), GetBucketsService.class);
        serviceIntent.setAction(BUCKET_CREATED);
        serviceIntent.putExtra("bucketName", bucketName);

        getReactApplicationContext().startService(serviceIntent);
    }

    @ReactMethod
    public void deleteBucket(final String bucketId) {
        Intent serviceIntent = new Intent(getReactApplicationContext(), GetBucketsService.class);
        serviceIntent.setAction(BUCKET_DELETED);
        serviceIntent.putExtra("bucketId", bucketId);

        getReactApplicationContext().startService(serviceIntent);
    }

    @ReactMethod
    public void deleteFile(final String bucketId, final String fileId) {
        Intent serviceIntent = new Intent(getReactApplicationContext(), GetBucketsService.class);
        serviceIntent.setAction(FILE_DELETED);
        serviceIntent.putExtra("bucketId", bucketId);
        serviceIntent.putExtra("fileId", fileId);

        getReactApplicationContext().startService(serviceIntent);
    }

    private void bindService(PromiseHandler handler, Class<? extends BaseReactService> serviceClass, Promise promise) {
        handler.setPromise(promise);

        Intent intent = new Intent(getReactApplicationContext(), serviceClass);
        getReactApplicationContext().bindService(intent, mConnection, Context.BIND_AUTO_CREATE);
    }

    private <T extends  BaseReactService> void connectService(PromiseHandler handler, T service, BaseReactService baseService, String value) {
        service = (T) baseService;
        handler.resolveString(value);
    }

    private <T> String toJson(T convertible) {
        return GsonSingle.getInstanse().toJson(convertible);
    }

    private <T> String toJson(List<T> convertible) {
        return GsonSingle.getInstanse().toJson(convertible);
    }
}
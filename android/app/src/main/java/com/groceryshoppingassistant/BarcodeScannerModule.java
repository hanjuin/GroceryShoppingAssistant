package com.groceryshoppingassistant;

import android.graphics.Bitmap;
import android.net.Uri;
import android.util.Base64;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.barcode.Barcode;
import com.google.mlkit.vision.barcode.BarcodeScanner;
import com.google.mlkit.vision.barcode.BarcodeScannerOptions;
import com.google.mlkit.vision.barcode.BarcodeScanning;
import java.io.IOException;
import java.util.List;

public class BarcodeScannerModule extends ReactContextBaseJavaModule {

    public BarcodeScannerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "BarcodeScannerModule";
    }

    @ReactMethod
    public void scanBarcodeFromUri(String imageUri, Promise promise) {
        try {
            InputImage image = InputImage.fromFilePath(getReactApplicationContext(), Uri.parse(imageUri));

            BarcodeScannerOptions options = new BarcodeScannerOptions.Builder()
                    .setBarcodeFormats(
                            Barcode.FORMAT_QR_CODE,
                            Barcode.FORMAT_EAN_13,
                            Barcode.FORMAT_CODE_128)
                    .build();

            BarcodeScanner scanner = BarcodeScanning.getClient(options);

            scanner.process(image)
                    .addOnSuccessListener(barcodes -> {
                        for (Barcode barcode : barcodes) {
                            String rawValue = barcode.getRawValue();
                            promise.resolve(rawValue);
                        }
                    })
                    .addOnFailureListener(e -> promise.reject("Barcode Scan Error", e));
        } catch (IOException e) {
            promise.reject("Image Processing Error", e);
        }
    }
}

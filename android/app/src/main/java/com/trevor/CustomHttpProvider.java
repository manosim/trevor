// package com.trevor;
//
// import com.facebook.react.modules.network.OkHttpClientProvider;
// import com.squareup.okhttp.OkHttpClient;
// import com.trevor.CustomInterceptor;
//
// import javax.annotation.Nullable;
// import java.util.concurrent.TimeUnit;
// import com.squareup.okhttp.OkHttpClient;
//
// public class CustomHttpProvider extends OkHttpClientProvider {
//
//     // Centralized OkHttpClient for all networking requests.
//     private static @Nullable OkHttpClient sClient;
//
//     public static OkHttpClient getOkHttpClient() {
//       if (sClient == null) {
//         sClient = createClient();
//       }
//
//       return sClient;
//     }
//
//     @Override
//     private static OkHttpClient createClient() {
//       // TODO: #7108751 plug in stetho
//       OkHttpClient client = new OkHttpClient();
//
//       // Add Custom Interceptor - User Agent
//       client.networkInterceptors().add(new CustomInterceptor());
//
//       // No timeouts by default
//       client.setConnectTimeout(0, TimeUnit.MILLISECONDS);
//       client.setReadTimeout(0, TimeUnit.MILLISECONDS);
//       client.setWriteTimeout(0, TimeUnit.MILLISECONDS);
//
//       return client;
//     }
//
// }

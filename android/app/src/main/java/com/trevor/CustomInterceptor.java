package com.trevor;

import com.squareup.okhttp.Interceptor;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;

import java.io.IOException;

public class CustomInterceptor implements Interceptor {

    public CustomInterceptor() {}

    @Override
    public Response intercept(Interceptor.Chain chain) throws IOException {
      Request originalRequest = chain.request();
      Request requestWithUserAgent = originalRequest.newBuilder()
          .removeHeader("User-Agent")
          .addHeader("User-Agent", "Trevor")
          .build();

      return chain.proceed(requestWithUserAgent);
    }

}

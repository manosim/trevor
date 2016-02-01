package com.trevor;

import java.io.IOException;

import com.squareup.okhttp.Interceptor;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;

public class CustomInterceptor implements Interceptor {
    @Override public Response intercept(Interceptor.Chain chain) throws IOException {

      Request originalRequest = chain.request();
      Request requestWithUserAgent = originalRequest.newBuilder()
          .addHeader("User-Agent", "Trevor")
          .build();

      System.out.println("---GELLO----");
      System.out.println("---------");
      System.out.println("---------");
      System.out.println("---------");
      System.out.println("---------");
      return chain.proceed(requestWithUserAgent);

    }
}

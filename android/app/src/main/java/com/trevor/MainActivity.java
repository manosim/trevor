package com.trevor;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.trevor.CustomInterceptor;
// import com.trevor.CustomHttpProvider;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);

      OkHttpClient client = new OkHttpClient();
      client.networkInterceptors().add(new CustomInterceptor());
      // httpBuilder.addNetworkInterceptor(new CustomInterceptor());
      // addNetworkInterceptor

    };

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Trevor";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

   /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage()
      );
    }

}

import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowClientPage } from './pages/show-client/show-client.page';
import { ClientService } from './services/client.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { UpdateProductPage } from './pages/update-product/update-product.page';
import { FormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { CreateProductPage } from './pages/create-product/create-product.page';
@NgModule({
  declarations: [AppComponent, ShowClientPage, UpdateProductPage, CreateProductPage],
  entryComponents: [
    ShowClientPage,
    UpdateProductPage,
    CreateProductPage
  ],
  imports: [BrowserModule, IonicModule.forRoot({
    mode: 'ios',
    backButtonText: 'Volver'
  }), AppRoutingModule,
  HttpClientModule,
  FormsModule,
  IonicStorageModule.forRoot()
],
  providers: [
    ClientService,
    ProductService,
    StatusBar,
    SplashScreen,
    Network,
    Camera,
    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {
        provide: HAMMER_GESTURE_CONFIG,
        useClass: HammerGestureConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

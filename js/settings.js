console.log(chrome.i18n.getMessage("app_name") + ": init settings.js");

window.addEventListener('load', (evt) => {

   const App = {
      // debug: true,

      getUI: {
         bthSave: document.getElementById('bth-save-settings'),
         ShowDownBar: document.getElementById("ShowDownBar"),
         // HideIconInfo: document.getElementById("HideIconInfo"),
         typeIconInfo: document.getElementById("typeIconInfo"),
         ShowLastProgress: document.getElementById("ShowLastProgress"),
         colorPicker: document.getElementById("colorPicker"),
      },

      bthAnimation: function (k) {
         k.innerHTML = chrome.i18n.getMessage("opt_bth_save_settings_process");
         k.classList.add("disabled");
         k.classList.add("in-progress");
         setTimeout(function () {
            k.innerHTML = chrome.i18n.getMessage("opt_bth_save_settings_processed");
            k.classList.remove("in-progress");
         }, 1000);
         setTimeout(function () {
            k.innerHTML = chrome.i18n.getMessage("opt_bth_save_settings");
            // k.classList.toggle("in-progress");
            k.classList.remove("disabled");
            chrome.runtime.reload();
         }, 2000);
      },

      // Saves options to localStorage/chromeSync.
      saveOptions: function (b) {
         var optionsSave = {};
         optionsSave['ShowDownBar'] = App.getUI.ShowDownBar.checked ? true : false;
         optionsSave['ShowLastProgress'] = App.getUI.ShowLastProgress.checked ? true : false;
         // optionsSave['HideIconInfo'] = App.getUI.HideIconInfo.checked ? true : false;
         optionsSave['typeIconInfo'] = App.getUI.typeIconInfo.value || false;
         optionsSave['colorPicker'] = App.getUI.colorPicker.value || false;

         // Storage.setParams(optionsSave, false /*local*/ );
         Storage.setParams(optionsSave, true /*sync*/ );

         App.bthAnimation(b)
      },

      init: function () {
         var callback = (res) => Storage.restoreOptions(res);
         // Storage.getParams(null, callback, false /*local*/ );
         Storage.getParams(null, callback, true /*sync*/ );
      },

      log: (msg, arg1) => {
         if (App.debug) console.log('[+] ' + msg.toString(), arg1 || '')
      }
   }

   App.init();

   App.getUI.bthSave.addEventListener("click", function () {
      App.saveOptions(this)
   });

   App.getUI.colorPicker.addEventListener("change", function (e) {
      console.log('color', this.value);
   });

   App.getUI.typeIconInfo.addEventListener("change", function (e) {
      if (this.value == 'false')
         document.getElementById('typeIconInfo_req').classList.add("hide");
      else
         document.getElementById('typeIconInfo_req').classList.remove("hide");

   });
});

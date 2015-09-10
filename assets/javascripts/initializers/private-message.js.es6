export default {
  name: "private-message",

  initialize: function(container) {
    var replyAsNewPrivateMessage = function () {
      var composerController = Discourse.__container__.lookup('controller:composer');
      var username = window.location.pathname.split('/')[2];

      composerController.open({
          action:      Discourse.Composer.PRIVATE_MESSAGE,
          usernames:   username,
          archetypeId: 'private_message',
          draftKey:    'new_private_message'
      }).then(function () {
          return '';
      }).then(function (q) {
          composerController.appendText('');
      });
    };

    var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = decodeURIComponent(window.location.search.substring(1)),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
        }
      }
    };

    $(document).ready(function(){
      var pm = getUrlParameter('pm');
      if(pm) {
        replyAsNewPrivateMessage();
      }
    });
  }
}

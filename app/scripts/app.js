(function() {
  function bootstrap() {
    angular.bootstrap(document, ['github'])
  }

  angular.module('github', ['github-browser']);

  angular
    .element(document)
    .ready(bootstrap);
})();

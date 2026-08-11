// Quotediano — botones de compartir en cada ficha (copiar enlace, Pinterest, X)
(function () {
    function absoluteUrl(path) {
          try {
                  return new URL(path, window.location.origin).href;
          } catch (e) {
                  return path;
          }
    }

   function showFeedback(icon, message) {
         var original = icon.getAttribute('data-original-title') || icon.getAttribute('title') || '';
         icon.setAttribute('data-original-title', original);
         icon.setAttribute('title', message);
         icon.classList.add('share-icon-active');
         setTimeout(function () {
                 icon.setAttribute('title', original);
                 icon.classList.remove('share-icon-active');
         }, 1600);
   }

   function fallbackCopy(text, icon) {
         var textarea = document.createElement('textarea');
         textarea.value = text;
         textarea.style.position = 'fixed';
         textarea.style.opacity = '0';
         document.body.appendChild(textarea);
         textarea.select();
         try {
                 document.execCommand('copy');
                 showFeedback(icon, 'Copiado');
         } catch (e) {
                 showFeedback(icon, 'Error al copiar');
         }
         document.body.removeChild(textarea);
   }

   document.addEventListener('click', function (e) {
         var icon = e.target.closest('.share-icon');
         if (!icon) return;

                                 var action = icon.getAttribute('data-share');
         var pageUrl = window.location.href;

                                 if (action === 'copy') {
                                         if (navigator.clipboard && navigator.clipboard.writeText) {
                                                   navigator.clipboard.writeText(pageUrl).then(function () {
                                                               showFeedback(icon, 'Copiado');
                                                   }).catch(function () {
                                                               fallbackCopy(pageUrl, icon);
                                                   });
                                         } else {
                                                   fallbackCopy(pageUrl, icon);
                                         }
                                         return;
                                 }

                                 if (action === 'pinterest') {
                                         var media = absoluteUrl(icon.getAttribute('data-image') || '');
                                         var desc = icon.getAttribute('data-desc') || document.title;
                                         var shareUrl = 'https://www.pinterest.com/pin/create/button/'
                                           + '?url=' + encodeURIComponent(pageUrl)
                                           + '&media=' + encodeURIComponent(media)
                                           + '&description=' + encodeURIComponent(desc);
                                         window.open(shareUrl, '_blank', 'noopener,noreferrer,width=750,height=550');
                                         return;
                                 }

                                 if (action === 'x') {
                                         var text = icon.getAttribute('data-text') || document.title;
                                         var shareUrl2 = 'https://twitter.com/intent/tweet'
                                           + '?url=' + encodeURIComponent(pageUrl)
                                           + '&text=' + encodeURIComponent(text);
                                         window.open(shareUrl2, '_blank', 'noopener,noreferrer,width=600,height=500');
                                         return;
                                 }
   });
})();

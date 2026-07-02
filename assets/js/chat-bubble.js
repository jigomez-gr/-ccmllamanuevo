/* Custom fix: floating chat bubble connected to an n8n webhook. Not part of the original IONOS export. */
(function () {
    // Webhook de producción del flujo de n8n para CCMFALLA (el workflow debe estar Activado en n8n,
    // y el nodo Webhook debe permitir CORS para el dominio de este sitio).
    var WEBHOOK_URL = 'https://n8njigretera.cloud/webhook/chat-ccmfallanuevo';
    var GREETING = 'Hola, ¿en qué puedo ayudarte sobre el Ciclo de Conciertos Manuel de Falla?';

    var ICON_CHAT = '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>';
    var ICON_CLOSE = '<svg viewBox="0 0 24 24"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
    var ICON_SEND = '<svg viewBox="0 0 24 24"><path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"/></svg>';

    function build() {
        var bubble = document.createElement('button');
        bubble.type = 'button';
        bubble.className = 'cb-bubble';
        bubble.setAttribute('aria-label', 'Abrir chat');
        bubble.innerHTML = ICON_CHAT;

        var container = document.createElement('div');
        container.className = 'cb-container';
        container.innerHTML =
            '<div class="cb-header">' +
                '<span class="cb-header-title">Asistente CCMFALLA</span>' +
                '<button type="button" class="cb-clear">Borrar</button>' +
            '</div>' +
            '<div class="cb-messages"></div>' +
            '<div class="cb-input-row">' +
                '<input type="text" class="cb-input" placeholder="Escribe un mensaje..." />' +
                '<button type="button" class="cb-send">' + ICON_SEND + '</button>' +
            '</div>';

        document.body.appendChild(bubble);
        document.body.appendChild(container);

        var messages = container.querySelector('.cb-messages');
        var input = container.querySelector('.cb-input');
        var sendBtn = container.querySelector('.cb-send');
        var clearBtn = container.querySelector('.cb-clear');

        function addMessage(text, cssClass) {
            var div = document.createElement('div');
            div.className = cssClass;
            div.textContent = text;
            messages.appendChild(div);
            messages.scrollTop = messages.scrollHeight;
            return div;
        }

        function resetConversation() {
            messages.innerHTML = '';
            addMessage(GREETING, 'cb-msg-ia');
        }

        function extractReply(result) {
            if (Array.isArray(result)) result = result[0] || {};
            if (typeof result === 'string') return result;
            if (!result || typeof result !== 'object') return String(result);
            return result.data || result.output || result.message || result.text ||
                JSON.stringify(result);
        }

        function toggleOpen(open) {
            var willOpen = open !== undefined ? open : !container.classList.contains('cb-open');
            container.classList.toggle('cb-open', willOpen);
            bubble.innerHTML = willOpen ? ICON_CLOSE : ICON_CHAT;
            bubble.setAttribute('aria-label', willOpen ? 'Cerrar chat' : 'Abrir chat');
            if (willOpen) input.focus();
        }

        async function sendMessage() {
            var texto = input.value.trim();
            if (!texto) return;

            addMessage(texto, 'cb-msg-user');
            input.value = '';
            sendBtn.disabled = true;

            var typing = addMessage('Escribiendo...', 'cb-typing');

            try {
                var response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        mensajeusuario: texto,
                        pagina: window.location.pathname
                    })
                });

                typing.remove();

                if (!response.ok) {
                    addMessage('Error del asistente (' + response.status + ').', 'cb-msg-ia cb-error');
                    return;
                }

                var result = await response.json();
                addMessage(extractReply(result), 'cb-msg-ia');
            } catch (e) {
                typing.remove();
                addMessage('No se pudo conectar con el asistente.', 'cb-msg-ia cb-error');
            } finally {
                sendBtn.disabled = false;
            }
        }

        // Avoid stacking on top of other fixed bottom-right elements: the site's
        // own cookie notice, and any Duda "sticky" widget (e.g. the ENTRADAS button).
        function bottomObstacleOverlap() {
            var candidates = [document.getElementById('d-notification-bar')].concat(
                Array.prototype.slice.call(document.querySelectorAll(
                    '.sticky-widgets-container-global a, .sticky-widgets-container a'
                ))
            );
            var maxOverlap = 0;
            candidates.forEach(function (el) {
                if (!el || el === bubble || el === container || container.contains(el)) return;
                var style = getComputedStyle(el);
                if (style.display === 'none' || style.visibility === 'hidden') return;
                var rect = el.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) return;
                var nearRight = rect.right > window.innerWidth - 140;
                var fullWidthBar = rect.width > window.innerWidth * 0.9;
                if (!nearRight && !fullWidthBar) return;
                var overlap = window.innerHeight - rect.top;
                if (overlap > maxOverlap) maxOverlap = overlap;
            });
            return maxOverlap;
        }

        function adjustPosition() {
            var overlap = bottomObstacleOverlap();
            var gap = overlap > 0 ? overlap + 12 : 16;
            bubble.style.bottom = gap + 'px';
            container.style.bottom = (gap + 72) + 'px';
        }
        adjustPosition();
        window.addEventListener('resize', adjustPosition);
        setInterval(adjustPosition, 1500);

        bubble.addEventListener('click', function () { toggleOpen(); });
        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
        clearBtn.addEventListener('click', function () {
            if (confirm('¿Deseas limpiar la conversación actual?')) resetConversation();
        });

        resetConversation();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', build);
    } else {
        build();
    }
})();

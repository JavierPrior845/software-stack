import type { Layer } from '../types';

export const layer3: Layer = {
  slug: 'redes-y-seguridad',
  number: 3,
  title: 'Redes y seguridad',
  subtitle: 'Cómo dos procesos en máquinas distintas acaban hablando el mismo idioma, y cómo lo hacen sin que nadie escuche.',
  hue: 250,
  blocks: [
    {
      slug: 'modelo-de-capas',
      title: 'Modelo de capas y encapsulación',
      summary:
        'Cada capa resuelve un problema distinto y añade su sobre. Entender el sobre es entender la red.',
      concepts: [
        {
          slug: 'osi-vs-tcpip',
          name: 'OSI vs TCP/IP',
          tagline: 'OSI es el mapa académico; TCP/IP es el territorio por el que viaja internet.',
          summary:
            'OSI tiene 7 capas teóricas; TCP/IP las colapsa en 4 prácticas: aplicación, transporte, red y enlace. Internet funciona con TCP/IP. Conocer OSI sirve para hablar con precisión, pero cuando depuras un fallo miras puertos, IPs y tramas, no capas de sesión.',
          keyPoints: [
            'Aplicación: HTTP, DNS, SSH. Transporte: TCP, UDP, QUIC. Red: IP. Enlace: Ethernet, Wi-Fi.',
            'La PDU cambia de nombre en cada capa: datos, segmento, paquete, trama.',
          ],
          tags: ['redes', 'protocolos'],
        },
        {
          slug: 'encapsulacion',
          name: 'Encapsulación',
          tagline: 'Tu JSON baja la escalera y en cada piso le pegan una etiqueta nueva.',
          summary:
            'Cada capa añade su cabecera al payload de la capa superior: TCP añade puertos y secuencia; IP, direcciones y TTL; Ethernet, MACs y FCS. En destino se retira en orden inverso. Este diseño permite cambiar una capa sin tocar las demás, y es la razón por la que HTTP funciona igual sobre Wi-Fi, fibra o 5G.',
          keyPoints: [
            'Cada cabecera cuesta bytes: el overhead se acumula en payloads pequeños.',
            'La encapsulación es la abstracción de red por excelencia.',
          ],
          tags: ['redes', 'protocolos'],
          diagram: 'encapsulation',
        },
        {
          slug: 'mtu',
          name: 'MTU y fragmentación',
          tagline: '1500 bytes por defecto. Pasarse significa partir el paquete y pagar en rendimiento.',
          summary:
            'La MTU de Ethernet es 1500 bytes. Si un paquete IP la supera, se fragmenta o se descarta (si lleva DF). La fragmentación multiplica cabeceras y puede provocar pérdidas desproporcionadas. Path MTU Discovery existe para evitarlo, y por eso los túneles VPN reducen la MTU efectiva y rompen conexiones que asumían 1500.',
          keyPoints: [
            'Un paquete perdido se retransmite entero, no solo el fragmento perdido en TCP.',
            'Síntoma clásico de MTU mal configurada: handshake OK, transferencias grandes colgadas.',
          ],
          tags: ['redes', 'rendimiento'],
        },
      ],
    },
    {
      slug: 'capa-de-red',
      title: 'Capa de red: direccionamiento y enrutamiento',
      summary:
        'IP conecta máquinas; NAT estira IPv4; DNS traduce nombres; ARP traduce a hardware.',
      concepts: [
        {
          slug: 'ip-y-nat',
          name: 'IP, subredes y NAT',
          tagline: 'Una dirección lógica por máquina, y un router que reescribe puertos para que quepan todas.',
          summary:
            'IPv4 son 32 bits divididos en red y host por la máscara. Las direcciones privadas (RFC 1918) no son enrutables en internet, así que NAT reescribe IP y puerto de origen para multiplexar muchas máquinas tras una IP pública. Funciona, pero rompe el modelo extremo a extremo y complica P2P y VoIP.',
          keyPoints: [
            'CIDR /24 = 256 direcciones, 254 útiles (red y broadcast).',
            'NAT/PAT mapea (IP privada, puerto) → (IP pública, puerto efímero).',
          ],
          tags: ['redes', 'ip'],
        },
        {
          slug: 'dns',
          name: 'DNS',
          tagline: 'La guía telefónica distribuida de internet, con caché y TTL para no colapsar.',
          summary:
            'DNS resuelve nombres a IPs mediante una jerarquía: raíz, TLD y servidores autoritativos. Los registros A/AAAA apuntan a IPs, CNAME crea alias, MX enruta correo y TXT verifica dominios. El TTL decide cuánto se cachea, y es la razón por la que un cambio de IP tarda horas en propagarse.',
          keyPoints: [
            'Bajar el TTL antes de una migración es la maniobra estándar.',
            'DNS sobre UDP 53; si la respuesta es grande, cae a TCP.',
          ],
          tags: ['redes', 'dns'],
        },
        {
          slug: 'dhcp-arp-icmp',
          name: 'DHCP, ARP e ICMP',
          tagline: 'Los tres servicios invisibles que hacen que conectarse a una red "simplemente funcione".',
          summary:
            'DHCP asigna IP, máscara, gateway y DNS al conectarse. ARP traduce una IP local a MAC mediante broadcast. ICMP transporta diagnóstico y errores: es la base de ping y traceroute. Ninguno transporta datos de usuario, pero sin ellos la red no arranca ni se puede depurar.',
          keyPoints: [
            'ARP solo funciona dentro de la red local: para salir, se resuelve el MAC del gateway.',
            'traceroute abusa del TTL: cada router que lo decrementa a cero responde con ICMP.',
          ],
          tags: ['redes', 'protocolos'],
        },
      ],
    },
    {
      slug: 'transporte',
      title: 'Capa de transporte',
      summary:
        'IP conecta máquinas; TCP y UDP conectan procesos. Ahí aparecen puertos, sockets y garantías.',
      concepts: [
        {
          slug: 'puertos-y-sockets',
          name: 'Puertos y sockets',
          tagline: 'Un puerto es un buzón; un socket, la conversación completa entre dos buzones.',
          summary:
            'Un puerto es un número de 16 bits que identifica un proceso. Un socket queda definido por la tupla (protocolo, IP origen, puerto origen, IP destino, puerto destino). Los puertos bien conocidos (0-1023) requieren privilegios; los efímeros (49152-65535) los asigna el SO a las conexiones salientes.',
          keyPoints: [
            'TIME_WAIT existe para absorber paquetes tardíos; por eso agotar puertos efímeros es un incidente real.',
            'Un servidor escucha en un puerto, pero cada conexión aceptada es un socket distinto.',
          ],
          tags: ['redes', 'transporte'],
        },
        {
          slug: 'tcp-handshake',
          name: 'TCP: handshake y garantías',
          tagline: 'SYN, SYN-ACK, ACK: tres mensajes para prometer orden, entrega y control de flujo.',
          summary:
            'TCP establece conexión con un three-way handshake, numera los segmentos para reordenar, confirma con ACKs y retransmite lo perdido. Además ajusta la ventana según el receptor y reduce el ritmo ante pérdidas. Cada garantía cuesta latencia: por eso un handshake en el otro lado del mundo son cientos de milisegundos antes del primer byte útil.',
          keyPoints: [
            'Control de flujo protege al receptor; control de congestión protege a la red.',
            'Un RTT alto penaliza tanto el handshake como el crecimiento inicial de la ventana.',
          ],
          tags: ['redes', 'tcp'],
          diagram: 'tls-handshake',
          tradeoffs: {
            whenToUse: ['APIs, bases de datos, ficheros: no puedes perder bytes'],
            whenToAvoid: ['Streaming en vivo o juegos donde un frame tardío ya no sirve'],
            cost: 'Handshake de 1 RTT antes de datos; retransmisiones ante pérdida.',
          },
        },
        {
          slug: 'control-de-congestion',
          name: 'Control de congestión',
          tagline: 'TCP empieza despacio y acelera hasta que la red protesta perdiendo paquetes.',
          summary:
            'Slow start duplica la ventana por RTT; congestion avoidance la crece linealmente; ante pérdida, se reduce. Los algoritmos modernos (CUBIC, BBR) cambian cómo se infiere la congestión: pérdida frente a latencia y ancho de banda estimado. Elegir mal el algoritmo puede dejar la mitad del enlace sin usar.',
          keyPoints: [
            'Bufferbloat: buffers grandes ocultan la congestión y añaden latencia sin mejorar throughput.',
            'En redes con pérdida aleatoria (Wi-Fi), BBR suele batir a CUBIC.',
          ],
          tags: ['redes', 'tcp', 'rendimiento'],
        },
        {
          slug: 'udp-quic',
          name: 'UDP y QUIC',
          tagline: 'UDP no promete nada y por eso es rápido; QUIC construye las promesas donde le conviene.',
          summary:
            'UDP envía datagramas sin conexión, sin ACKs y sin orden: ideal para vídeo, juegos, DNS y telemetría. QUIC (HTTP/3) implementa fiabilidad, cifrado y multiplexación sobre UDP en espacio de usuario, eliminando el bloqueo de cabeza de línea de TCP y reduciendo el handshake a 0-1 RTT.',
          keyPoints: [
            'HTTP/3 ya no usa TCP: usa QUIC sobre UDP 443.',
            'La multiplexación de QUIC evita que un paquete perdido bloquee todos los streams.',
          ],
          tags: ['redes', 'udp', 'http'],
        },
      ],
    },
    {
      slug: 'aplicacion-web',
      title: 'Aplicación web y servidores',
      summary:
        'HTTP es el contrato; los códigos de estado son el diagnóstico; el reverse proxy es la puerta blindada.',
      concepts: [
        {
          slug: 'http',
          name: 'HTTP',
          tagline: 'Una petición, unos headers y un body: el protocolo que sostiene la web entera.',
          summary:
            'HTTP es un protocolo de texto (hasta HTTP/2, que es binario) con método, ruta, versión, headers y body opcional. GET debe ser seguro e idempotente; PUT y DELETE idempotentes; POST no necesariamente. Los headers negocian contenido, autenticación y caché, y son donde vive la mitad de la semántica real.',
          keyPoints: [
            'Idempotencia: repetir un GET/PUT/DELETE no debería cambiar el resultado.',
            'HTTP/2 multiplexa sobre una conexión; HTTP/3 elimina el bloqueo con QUIC.',
          ],
          tags: ['web', 'http'],
        },
        {
          slug: 'codigos-de-estado',
          name: 'Códigos de estado',
          tagline: 'El 401 no es lo mismo que el 403, y confundirlos rompe la autenticación de tus clientes.',
          summary:
            '2xx éxito, 3xx redirección/caché, 4xx error del cliente, 5xx error del servidor. 401 significa "no autenticado"; 403, "autenticado pero sin permiso". 429 indica rate limiting y 502/504 distinguen fallo de upstream de timeout. Usar 200 para errores de negocio es una decisión que se paga en observabilidad.',
          keyPoints: [
            '304 Not Modified es la base de la caché HTTP eficiente.',
            'Un 500 con stack trace expuesto es un incidente de seguridad, no solo de UX.',
          ],
          tags: ['web', 'http'],
        },
        {
          slug: 'reverse-proxy',
          name: 'Reverse proxy y balanceo',
          tagline: 'Tu aplicación nunca debería ver internet directamente.',
          summary:
            'Nginx, Caddy o un balanceador cloud reciben el tráfico, terminan TLS, reparten carga y filtran ataques antes de llegar al backend. La terminación TLS libera CPU de la app; el balanceo permite escalar horizontalmente; el proxy absorbe picos y aplica timeouts. Es la pieza que separa "funciona en local" de "aguanta producción".',
          keyPoints: [
            'Round Robin reparte; Least Connections prioriza el backend menos ocupado.',
            'Los timeouts del proxy suelen ser la causa real de un 504, no la base de datos.',
          ],
          tags: ['web', 'infraestructura'],
        },
      ],
    },
    {
      slug: 'criptografia-y-tls',
      title: 'Criptografía y TLS',
      summary:
        'Confidencialidad, integridad y disponibilidad. Y el handshake que combina lo rápido con lo seguro.',
      concepts: [
        {
          slug: 'triada-cia',
          name: 'Tríada CIA',
          tagline: 'Confidencialidad, integridad y disponibilidad: si falla una, el sistema deja de ser seguro.',
          summary:
            'Confidencialidad: solo el receptor lee el dato (cifrado). Integridad: nadie lo modifica por el camino (hashing y firmas). Disponibilidad: el sistema responde cuando se necesita (redundancia, anti-DDoS). La mayoría de incidentes no rompen el cifrado: rompen la disponibilidad o la integridad de los procesos.',
          keyPoints: [
            'Cifrar sin autenticar es vulnerable a manipulación (de ahí AEAD).',
            'La seguridad es un sistema, no una librería.',
          ],
          tags: ['seguridad', 'fundamentos'],
        },
        {
          slug: 'hash-vs-cifrado',
          name: 'Hashing vs cifrado',
          tagline: 'Un hash no se descifra; un cifrado sí. Confundirlos es cómo se filtran contraseñas.',
          summary:
            'El hash es unidireccional y de tamaño fijo: sirve para integridad y para almacenar contraseñas (con salt y función lenta como bcrypt o Argon2). El cifrado es bidireccional: sirve para proteger datos que luego hay que leer. Guardar contraseñas con SHA-256 simple es equivalente a guardarlas casi en claro frente a GPUs.',
          keyPoints: [
            'Contraseñas: Argon2id, bcrypt o scrypt. Nunca SHA-256 a pelo.',
            'Compara hashes en tiempo constante para evitar timing attacks.',
          ],
          tags: ['seguridad', 'criptografía'],
        },
        {
          slug: 'simetrico-vs-asimetrico',
          name: 'Cifrado simétrico vs asimétrico',
          tagline: 'El simétrico es rápido pero necesita compartir la clave; el asimétrico resuelve el reparto pero es lento.',
          summary:
            'AES cifra y descifra con la misma clave: rapidísimo, pero ¿cómo la compartes? RSA y ECC usan par público/privado y resuelven el intercambio y las firmas, a costa de operaciones mucho más caras. La solución real no es elegir: es usar asimétrico para acordar una clave y simétrico para los datos.',
          keyPoints: [
            'Las firmas digitales se crean con la privada y se verifican con la pública.',
            'ECC ofrece seguridad comparable a RSA con claves mucho más pequeñas.',
          ],
          tags: ['seguridad', 'criptografía'],
        },
        {
          slug: 'tls-handshake',
          name: 'Handshake TLS',
          tagline: 'Certificado, acuerdo de clave efímera y a partir de ahí todo va cifrado con AES.',
          summary:
            'El servidor presenta un certificado X.509 firmado por una CA de confianza. Cliente y servidor acuerdan una clave de sesión con ECDHE (forward secrecy: si roban la clave privada mañana, no pueden descifrar el tráfico de ayer). Después todo va con cifrado simétrico. TLS 1.3 reduce el handshake a un RTT (o cero en reanudación).',
          keyPoints: [
            'Los certificados validan identidad; ECDHE garantiza forward secrecy.',
            'TLS 1.3 eliminó suites débiles y el renegotiation inseguro.',
          ],
          tags: ['seguridad', 'tls', 'web'],
          diagram: 'tls-handshake',
          tradeoffs: {
            whenToUse: ['Siempre. No hay tráfico HTTP legítimo sin TLS en 2026.'],
            whenToAvoid: ['Nunca en producción; en local usa certificados de desarrollo (mkcert).'],
            cost: '1 RTT adicional en conexión nueva; la terminación TLS consume CPU en el proxy.',
          },
        },
      ],
    },
  ],
};

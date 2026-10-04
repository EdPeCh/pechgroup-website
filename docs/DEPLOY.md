# Deploy de pechgroup.com (GitHub Pages)

El build y la publicación los hace `.github/workflows/deploy.yml` en cada push a
`master` (y manualmente desde Actions > "Deploy to GitHub Pages" > Run workflow).
Los pull requests se validan con `.github/workflows/ci.yml` (no publican).

Mientras Pages no esté activado (paso 1), el job `deploy` falla con
"Failed to create deployment (status: 404)". Después de activarlo, volver a
correr el workflow desde Actions > "Deploy to GitHub Pages" > Run workflow.

Estos pasos se hacen **una sola vez, fuera del repo**:

## 1. Activar GitHub Pages

1. En GitHub: `edpech/pechgroup-website` > **Settings > Pages**.
2. En **Build and deployment > Source**, elegir **GitHub Actions**.
3. En **Custom domain** debe aparecer `pechgroup.com` (lo toma de `public/CNAME`
   tras el primer deploy; si no, escribirlo y guardar).
4. Cuando el DNS ya resuelva y el certificado esté emitido, marcar
   **Enforce HTTPS**.

## 2. Desconectar GoDaddy Website Builder

Antes de tocar el DNS, desconectar/despublicar el sitio de **GoDaddy Website
Builder** del dominio `pechgroup.com`. Si sigue conectado, GoDaddy vuelve a
escribir sus propios registros A y el dominio deja de apuntar a GitHub Pages.

## 3. DNS en GoDaddy

En GoDaddy > Mis productos > `pechgroup.com` > **DNS**:

| Tipo  | Nombre | Valor                 |
|-------|--------|-----------------------|
| A     | @      | 185.199.108.153       |
| A     | @      | 185.199.109.153       |
| A     | @      | 185.199.110.153       |
| A     | @      | 185.199.111.153       |
| CNAME | www    | edpech.github.io      |

- Borrar cualquier **otro** registro A de `@` (los de GoDaddy / "Parked") y
  reemplazar el CNAME `www` existente.

> ⚠️ **NO tocar los registros MX, TXT ni el CNAME `autodiscover`.** Ahí vive el
> correo Microsoft 365 del dominio (MX, SPF/verificación en TXT, autodiscover
> de Outlook). Si se borran o modifican, el correo de @pechgroup.com deja de
> funcionar. Solo se cambian los registros A de `@` y el CNAME `www`.

## 4. Verificar

- La propagación del DNS puede tardar de minutos a unas horas.
- `https://pechgroup.com` y `https://www.pechgroup.com` deben mostrar el sitio.
- Settings > Pages debe indicar "DNS check successful".
- Enviar un correo de prueba a una cuenta @pechgroup.com para confirmar que el
  correo sigue funcionando.

## Formulario de contacto

Hoy `/contact` abre el cliente de correo del visitante (mailto a
edgar.pereda@pechgroup.com). Para reactivar Formspree cuando exista el ID, ver
el comentario encima del `<form>` en `src/pages/contact.astro`.

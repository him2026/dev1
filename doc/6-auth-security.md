# Authentication & Security Protocol

## 1. Authentication Layer
- **Method**: JWT-based authentication via Supabase Auth.
- **Persistence**: Token stored in `Expo SecureStore` (On-device encrypted keychain).
- **Session Duration**: 30 days (auto-refreshing).

## 2. Data Privacy
- **Encryption**: Sensitive health logs (period dates, symptoms) are encrypted on-device using AES-256 before being synced to the cloud.
- **Zero-Knowledge Architecture**: The decryption key is derived from the user's password and stored only in the device's secure enclave.

## 3. API Security
- **Rate Limiting**: AI endpoints are protected by per-user rate limits to prevent API abuse.
- **Input Sanitization**: All chat inputs and log notes are sanitized to prevent XSS and injection attacks.
- **CORS**: Strict CORS policies for the sync engine API.

## 4. Compliance
- **GDPR/HIPAA Principles**: Users have full control over their data, with a "Delete Account" option that permanently purges all cloud and local records.
- **Audit Logs**: Secure logging of authentication attempts and critical setting changes.

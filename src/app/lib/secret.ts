import * as crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

function splitEncryptedText(encryptedText: string) {
    return {
        ivString: encryptedText.slice(0, 32),
        encryptedDataString: encryptedText.slice(32),
    };
}

export default class Secret {
    encoding: BufferEncoding = 'hex';
    key: Buffer;

    constructor() {
        const keyHex = process.env.CRYPTO_KEY;

        if (keyHex!.length !== 64) {
        throw new Error('CRYPTO_KEY harus 64 karakter hex (32 byte)');
        }

        this.key = Buffer.from(keyHex!, 'hex');
    }

    encrypt(plaintext: string): string | undefined {
        try {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv('aes-256-cbc', this.key, iv);
            const encrypted = Buffer.concat([
                cipher.update(plaintext, 'utf-8'),
                cipher.final(),
            ]);
            return iv.toString(this.encoding) + encrypted.toString(this.encoding);
        } catch (e) {
            console.error('Encrypt error:', e);
            return undefined;
        }
    }

    decrypt(cipherText: string): string | undefined {
        if (!cipherText) return undefined;
            const { ivString, encryptedDataString } = splitEncryptedText(cipherText);

        try {
            const iv = Buffer.from(ivString, this.encoding);
            const encryptedText = Buffer.from(encryptedDataString, this.encoding);
            const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, iv);
            const decrypted = Buffer.concat([
                decipher.update(encryptedText),
                decipher.final(),
            ]);
            return decrypted.toString();
        } catch (e) {
            console.error('Decrypt error:', e);
            return undefined;
        }
    }
}
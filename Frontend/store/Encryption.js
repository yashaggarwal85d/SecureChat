import * as crypto from 'crypto';

export const create = async () => {
  const user = crypto.createECDH('secp256k1');
  user.generateKeys();
  return user;
};

export const PublicKey = async (user) => {
  return user.getPublicKey().toString('base64');
};

export const SharedKey = async (user, publicKey) => {
  return user.computeSecret(publicKey, 'base64', 'hex');
};

export const encrypt = async (MESSAGE, key) => {
  const IV = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    'aes-256-gcm',
    Buffer.from(key, 'hex'),
    IV
  );

  let encrypted = cipher.update(MESSAGE, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const auth_tag = cipher.getAuthTag().toString('hex');

  console.log({
    IV: IV.toString('hex'),
    encrypted: encrypted,
    auth_tag: auth_tag,
  });

  const payload = IV.toString('hex') + encrypted + auth_tag;
  const payload64 = Buffer.from(payload, 'hex').toString('base64');
  console.log(payload64);
  return payload64;
};

export const decrypt = async (payload64, key) => {
  const bob_payload = Buffer.from(payload64, 'base64').toString('hex');

  const bob_iv = bob_payload.substr(0, 32);
  const bob_encrypted = bob_payload.substr(32, bob_payload.length - 32 - 32);
  const bob_auth_tag = bob_payload.substr(bob_payload.length - 32, 32);

  try {
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      Buffer.from(key, 'hex'),
      Buffer.from(bob_iv, 'hex')
    );

    decipher.setAuthTag(Buffer.from(bob_auth_tag, 'hex'));
    let decrypted = decipher.update(bob_encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.log(error.message);
  }
};

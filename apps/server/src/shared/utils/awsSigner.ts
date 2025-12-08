import { AwsClient } from 'aws4fetch';

type CreatePresignerOptions = {
  accountId: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
};

type PresignOverrides = {
  method?: string;
  expiresSeconds?: number;
};

export function createPresigner(options: CreatePresignerOptions) {
  const client = new AwsClient({
    service: 's3',
    region: 'auto',
    accessKeyId: options.accessKeyId,
    secretAccessKey: options.secretAccessKey,
  });

  const baseUrl = `https://${options.accountId}.r2.cloudflarestorage.com`;

  return async (
    key: string,
    { method = 'PUT', expiresSeconds = 300 }: PresignOverrides = {},
  ) => {
    const url = `${baseUrl}/${options.bucket}/${key}?X-Amz-Expires=${expiresSeconds}`;

    const signed = await client.sign(new Request(url, { method }), {
      aws: { signQuery: true },
    });

    return signed.url.toString();
  };
}

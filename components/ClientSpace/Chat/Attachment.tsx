// components/ClientSpace/Chat/Attachment.tsx
'use client';

export default function Attachment({ att }: { att: any }) {
  if (!att || typeof att !== 'object') return null;
  const url = att.url || '';
  const name = att.name || 'pièce jointe';
  const kind =
    att.kind || (att.mime?.startsWith?.('image/') ? 'image' : 'file');

  if (kind === 'image' && url) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="block overflow-hidden rounded-xl"
      >
        <img src={url} alt={name} className="max-h-64 object-cover" />
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="text-sm underline underline-offset-4 break-all"
    >
      {name}
    </a>
  );
}

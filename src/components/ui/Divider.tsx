interface IDivider {
  text: string;
}

export function Divider({ text }: IDivider) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-light" />

      <span className="label uppercase text-light">
        {text}
      </span>

      <div className="flex-1 h-px bg-light" />
    </div>
  );
}
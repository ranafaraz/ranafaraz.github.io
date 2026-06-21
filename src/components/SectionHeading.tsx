import Reveal from './Reveal';

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

/** Consistent section header: mono eyebrow + gradient-accented display title. */
export default function SectionHeading({ eyebrow, title, subtitle }: Props) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <span className="eyebrow">
        <span className="h-px w-8 bg-cyan/60" aria-hidden />
        {eyebrow}
      </span>
      <h2 className="heading text-slate-900 dark:text-white">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

import { useReveal } from '../../hooks/useReveal';

/**
 * Wraps anything that should fade up as it enters the viewport.
 *
 * Sets data-reveal rather than toggling a class, matching the envelope's
 * data-phase channel so there is one way state reaches CSS in this project.
 *
 * `as` exists so this does not force an extra <div> into layouts that care.
 */
export function Reveal({ as: Tag = 'div', stagger = false, children, ...rest }) {
  const [ref, state] = useReveal();
  return (
    <Tag
      ref={ref}
      data-reveal={state}
      data-stagger={stagger ? '' : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

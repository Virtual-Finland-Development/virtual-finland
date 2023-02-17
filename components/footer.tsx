import { Block, Icon, Link } from 'suomifi-ui-components';
import CustomHeading from './custom-heading';
import CustomLink from './custom-link';

const HELP_LINKS = [
  { href: '#', label: 'Who runs this service?' },
  { href: '#', label: 'What are the steps in the imigration process?' },
  { href: '#', label: 'What I need to know about Residence permit?' },
  { href: '#', label: 'EU requirements for those arriving outside region' },
  { href: '#', label: 'What do I need to know about Finland?' },
  { href: '#', label: 'I present a company. What should I do?' },
  { href: '#', label: 'I have family coming with me. What should I do?' },
];

function Help() {
  return (
    <>
      <Block variant="section" className="bg-white px-4 py-6">
        <CustomHeading variant="h4">Helpful links</CustomHeading>
        <ul>
          {HELP_LINKS.map(item => (
            <li key={item.label}>
              <div className="flex flex-row gap-1 items-center">
                <Icon
                  icon="chevronRight"
                  className="-ml-1 text-base text-suomifi-orange"
                />
                <CustomLink href={item.href} base>
                  {item.label}
                </CustomLink>
              </div>
            </li>
          ))}
        </ul>
      </Block>
      <Block variant="section"></Block>
    </>
  );
}

function Social() {
  return null;
}

export default function Footer() {
  return (
    <Block
      variant="footer"
      className="border-t-4 border-solid border-t-suomifi-dark bg-white"
    >
      <div className="container">
        <Help />
        <Social />
      </div>
    </Block>
  );
}

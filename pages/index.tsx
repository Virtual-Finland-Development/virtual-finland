import { Block, Button, StaticIcon, Text } from 'suomifi-ui-components';
import CustomHeading from '@/components/custom-heading';
import CustomLink from '@/components/custom-link';

export default function HomePage() {
  return (
    <>
      <Block variant="section" className="bg-suomifi-blue-bg px-4 py-6">
        <CustomHeading variant="h2" suomiFiBlue="dark">
          The only service you need for moving into Finland
        </CustomHeading>
        <div className="flex flex-col mt-8">
          <StaticIcon
            icon="book"
            baseColor="grey"
            highlightColor="purple"
            className="h-16 w-16"
          />
          <Text>
            All information and services about moving to Finland and living in
            Finland can be found under one address. From here, you can apply to
            all Finnish government agencies from one place. Whether you are
            starting your process of moving to Finland or you have already
            entered country you’ll find guidance and tools to communicate with
            right authorities.
          </Text>
        </div>
        <div className="flex flex-col mt-8">
          <StaticIcon
            icon="userProfile"
            baseColor="grey"
            highlightColor="purple"
            className="h-16 w-16"
          />
          <Text>
            For the beginning all you need is to create your own profile and
            start the application process. After having profile you have full
            access to your personal data at anytime and from anywhere.
          </Text>
        </div>
      </Block>

      <Block variant="section" className="bg-suomifi-blue-bg px-4 py-6">
        <CustomHeading variant="h2" suomiFiBlue="dark">
          Start by creating your profile
        </CustomHeading>
        <div className="py-4">
          <Button>Create profile</Button>
        </div>
      </Block>

      <Block variant="section" className="bg-white px-4 py-6">
        <CustomHeading variant="h2" suomiFiBlue="dark">
          What can I do here?
        </CustomHeading>
        <div className="flex flex-col mt-4">
          <Text>
            Choose who you’re presenting and click for more information about
            what can you do.
          </Text>
          <div className="flex flex-col gap-6 mt-6">
            <div className="flex flex-row items-center gap-6 py-2">
              <StaticIcon
                icon="manButtons"
                className="h-16 w-16 flex-shrink-0"
              />
              <CustomLink href="#">Apply for yourself</CustomLink>
            </div>
            <div className="flex flex-row items-center gap-6 py-2">
              <StaticIcon icon="team" className="h-16 w-16 flex-shrink-0" />
              <CustomLink href="#">Apply on behalf of someone</CustomLink>
            </div>
            <div className="flex flex-row items-center gap-6 py-2">
              <StaticIcon
                icon="organisation"
                className="h-16 w-16 flex-shrink-0"
              />
              <CustomLink href="#">
                Apply on behalf of company or organization
              </CustomLink>
            </div>
          </div>
        </div>
      </Block>

      <Block variant="section" className="bg-white px-4 py-6">
        <CustomHeading variant="h2" suomiFiBlue="dark">
          I’m coming to Finland to
        </CustomHeading>
        <div className="flex flex-col mt-4">
          <div className="bg-suomifi-blue-bg flex flex-row items-center gap-6 py-2">
            <StaticIcon icon="doctor" className="h-16 w-16 flex-shrink-0" />
            <CustomLink href="#" bold={true}>
              work
            </CustomLink>
          </div>
          <div className="flex flex-row items-center gap-6 py-2">
            <StaticIcon icon="manLaptop" className="h-16 w-16 flex-shrink-0" />
            <CustomLink href="#" bold={true}>
              study
            </CustomLink>
          </div>
          <div className="bg-suomifi-blue-bg flex flex-row items-center gap-6 py-2">
            <StaticIcon icon="shop" className="h-16 w-16 flex-shrink-0" />
            <CustomLink href="#" bold={true}>
              create business
            </CustomLink>
          </div>
          <div className="flex flex-row items-center gap-6 py-2">
            <StaticIcon icon="family" className="h-16 w-16 flex-shrink-0" />
            <CustomLink href="#" bold={true}>
              along with family
            </CustomLink>
          </div>
          <div className="bg-suomifi-blue-bg flex flex-row items-center gap-6 py-2">
            <StaticIcon icon="catalog" className="h-16 w-16 flex-shrink-0" />
            <CustomLink href="#" bold={true}>
              other
            </CustomLink>
          </div>
        </div>
      </Block>
    </>
  );
}

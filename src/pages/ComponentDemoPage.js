import React from 'react';
import { useTitle } from '../hooks/useTitle';
import {
  Box,
  Button,
  Text,
  Heading,
  Link,
  Avatar,
  AvatarPair,
  AvatarStack,
  Label,
  StateLabel,
  Flash,
  Timeline,
  Spinner,
  ProgressBar,
  ActionList,
  ActionMenu,
  Breadcrumbs,
  SegmentedControl,
  FormControl,
  TextInput,
  Textarea,
  Select,
  Checkbox,
  Radio,
  TabNav,
  Dialog,
  useConfirm
} from '@primer/react';
import {
  PlusIcon,
  GearIcon,
  InfoIcon,
  PersonIcon,
  RepoIcon
} from '@primer/octicons-react';
import { useTheme } from '../context/ThemeContext';

const ComponentDemoPage = () => {
  useTitle('Component Demo | Vincius AI GUI');
  const { colorMode, toggleTheme, dayScheme, nightScheme, changeColorScheme } = useTheme();
  const { confirmAction } = useConfirm();

  const handleOpenDialog = () => {
    confirmAction({
      title: 'Confirm Action',
      content: 'Are you sure you want to perform this action?',
      confirmButtonContent: 'Confirm',
      cancelButtonContent: 'Cancel',
      onConfirm: () => console.log('Confirmed'),
      onCancel: () => console.log('Cancelled')
    });
  };

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 3, py: 5 }}>
      <Heading sx={{ mb: 4 }}>Primer.style Component Demo</Heading>
      <Text as="p" sx={{ mb: 4 }}>
        This page demonstrates the various components available in the Primer design system.
      </Text>
      
      <Box sx={{ mb: 5 }}>
        <Heading as="h2" sx={{ fontSize: 3, mb: 3 }}>Theme Controls</Heading>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Text sx={{ mr: 2 }}>Current Theme Mode:</Text>
          <Button onClick={toggleTheme}>
            {colorMode === 'day' ? 'Switch to Dark' : 'Switch to Light'}
          </Button>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <Text>Day Color Scheme: {dayScheme}</Text>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button onClick={() => changeColorScheme('day', 'light')}>Light</Button>
            <Button onClick={() => changeColorScheme('day', 'light_colorblind')}>Light Colorblind</Button>
            <Button onClick={() => changeColorScheme('day', 'light_high_contrast')}>High Contrast</Button>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Text>Night Color Scheme: {nightScheme}</Text>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button onClick={() => changeColorScheme('night', 'dark')}>Dark</Button>
            <Button onClick={() => changeColorScheme('night', 'dark_colorblind')}>Dark Colorblind</Button>
            <Button onClick={() => changeColorScheme('night', 'dark_high_contrast')}>Dark High Contrast</Button>
            <Button onClick={() => changeColorScheme('night', 'dark_dimmed')}>Dark Dimmed</Button>
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ my: 5 }}>
        <Heading as="h2" sx={{ fontSize: 3, mb: 3 }}>Buttons</Heading>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
          <Button>Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="invisible">Invisible</Button>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Button leadingIcon={PlusIcon}>With Icon</Button>
          <Button size="small">Small</Button>
          <Button disabled>Disabled</Button>
          <Button IconComponent={GearIcon} aria-label="Settings" />
        </Box>
      </Box>
      
      <Box sx={{ my: 5 }}>
        <Heading as="h2" sx={{ fontSize: 3, mb: 3 }}>Typography</Heading>
        <Heading as="h1" sx={{ mb: 2 }}>Heading 1</Heading>
        <Heading as="h2" sx={{ mb: 2 }}>Heading 2</Heading>
        <Heading as="h3" sx={{ mb: 2 }}>Heading 3</Heading>
        <Heading as="h4" sx={{ mb: 2 }}>Heading 4</Heading>
        <Text>Regular Text</Text>
        <Text sx={{ fontWeight: 'bold', display: 'block' }}>Bold Text</Text>
        <Text sx={{ fontStyle: 'italic', display: 'block' }}>Italic Text</Text>
        <Link href="#" sx={{ display: 'block' }}>Link Text</Link>
      </Box>
      
      <Box sx={{ my: 5 }}>
        <Heading as="h2" sx={{ fontSize: 3, mb: 3 }}>Avatars</Heading>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mb: 3 }}>
          <Avatar src="https://github.com/octocat.png" size={32} />
          <Avatar src="https://github.com/octocat.png" size={48} />
          <Avatar src="https://github.com/octocat.png" size={64} />
        </Box>
        
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mb: 3 }}>
          <AvatarPair>
            <Avatar src="https://github.com/octocat.png" />
            <Avatar src="https://github.com/github.png" />
          </AvatarPair>
        </Box>
        
        <AvatarStack>
          <Avatar src="https://github.com/octocat.png" />
          <Avatar src="https://github.com/github.png" />
          <Avatar src="https://github.com/octocat.png" />
          <Avatar src="https://github.com/github.png" />
        </AvatarStack>
      </Box>
      
      <Box sx={{ my: 5 }}>
        <Heading as="h2" sx={{ fontSize: 3, mb: 3 }}>Labels</Heading>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
          <Label>Default</Label>
          <Label variant="accent">Accent</Label>
          <Label variant="success">Success</Label>
          <Label variant="attention">Attention</Label>
          <Label variant="danger">Danger</Label>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <StateLabel status="issueOpened">Open</StateLabel>
          <StateLabel status="issueClosed">Closed</StateLabel>
          <StateLabel status="pullOpened">Open</StateLabel>
          <StateLabel status="pullClosed">Closed</StateLabel>
          <StateLabel status="pullMerged">Merged</StateLabel>
        </Box>
      </Box>
      
      <Box sx={{ my: 5 }}>
        <Heading as="h2" sx={{ fontSize: 3, mb: 3 }}>Flash Messages</Heading>
        <Flash variant="default" sx={{ mb: 2 }}>This is a default flash message.</Flash>
        <Flash variant="success" sx={{ mb: 2 }}>This is a success flash message.</Flash>
        <Flash variant="warning" sx={{ mb: 2 }}>This is a warning flash message.</Flash>
        <Flash variant="danger" sx={{ mb: 2 }}>This is a danger flash message.</Flash>
        <Flash icon={InfoIcon} sx={{ mb: 2 }}>This is a flash message with an icon.</Flash>
      </Box>
      
      <Box sx={{ my: 5 }}>
        <Heading as="h2" sx={{ fontSize: 3, mb: 3 }}>Forms</Heading>
        
        <Box sx={{ mb: 3 }}>
          <FormControl>
            <FormControl.Label>Text Input</FormControl.Label>
            <TextInput placeholder="Type something..." />
          </FormControl>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <FormControl>
            <FormControl.Label>Textarea</FormControl.Label>
            <Textarea placeholder="Write a longer text..." rows={4} />
          </FormControl>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <FormControl>
            <FormControl.Label>Select</FormControl.Label>
            <Select>
              <Select.Option value="option1">Option 1</Select.Option>
              <Select.Option value="option2">Option 2</Select.Option>
              <Select.Option value="option3">Option 3</Select.Option>
            </Select>
          </FormControl>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <FormControl>
            <Checkbox id="checkbox1" />
            <FormControl.Label htmlFor="checkbox1">Checkbox option</FormControl.Label>
          </FormControl>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <FormControl>
            <Radio name="radio-group" id="radio1" value="option1" />
            <FormControl.Label htmlFor="radio1">Radio option 1</FormControl.Label>
          </FormControl>
          <FormControl>
            <Radio name="radio-group" id="radio2" value="option2" />
            <FormControl.Label htmlFor="radio2">Radio option 2</FormControl.Label>
          </FormControl>
        </Box>
      </Box>
      
      <Box sx={{ my: 5 }}>
        <Heading as="h2" sx={{ fontSize: 3, mb: 3 }}>Navigation</Heading>
        
        <Box sx={{ mb: 4 }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>Breadcrumbs</Heading>
          <Breadcrumbs>
            <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/components">Components</Breadcrumbs.Item>
            <Breadcrumbs.Item selected>Demo</Breadcrumbs.Item>
          </Breadcrumbs>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>Tab Navigation</Heading>
          <TabNav>
            <TabNav.Link href="#" selected>Overview</TabNav.Link>
            <TabNav.Link href="#">Details</TabNav.Link>
            <TabNav.Link href="#">Files</TabNav.Link>
            <TabNav.Link href="#">Comments</TabNav.Link>
          </TabNav>
        </Box>
      </Box>
      
      <Box sx={{ my: 5 }}>
        <Heading as="h2" sx={{ fontSize: 3, mb: 3 }}>Interactive Elements</Heading>
        
        <Box sx={{ mb: 4 }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>Action List</Heading>
          <ActionList>
            <ActionList.Item>
              <ActionList.LeadingVisual>
                <PersonIcon />
              </ActionList.LeadingVisual>
              View profile
            </ActionList.Item>
            <ActionList.Item>
              <ActionList.LeadingVisual>
                <RepoIcon />
              </ActionList.LeadingVisual>
              Repositories
            </ActionList.Item>
            <ActionList.Divider />
            <ActionList.Item variant="danger">
              Sign out
            </ActionList.Item>
          </ActionList>
        </Box>
        
        <Box sx={{ mb: 4, maxWidth: '200px' }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>Action Menu</Heading>
          <ActionMenu>
            <ActionMenu.Button>Options</ActionMenu.Button>
            <ActionMenu.Overlay>
              <ActionList>
                <ActionList.Item>New file</ActionList.Item>
                <ActionList.Item>Copy link</ActionList.Item>
                <ActionList.Item>Edit file</ActionList.Item>
                <ActionList.Divider />
                <ActionList.Item variant="danger">Delete file</ActionList.Item>
              </ActionList>
            </ActionMenu.Overlay>
          </ActionMenu>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>Segmented Control</Heading>
          <SegmentedControl aria-label="File view">
            <SegmentedControl.Button selected>Preview</SegmentedControl.Button>
            <SegmentedControl.Button>Raw</SegmentedControl.Button>
            <SegmentedControl.Button>Blame</SegmentedControl.Button>
          </SegmentedControl>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>Dialog</Heading>
          <Button onClick={handleOpenDialog}>Open Dialog</Button>
        </Box>
      </Box>
      
      <Box sx={{ my: 5 }}>
        <Heading as="h2" sx={{ fontSize: 3, mb: 3 }}>Progress Indicators</Heading>
        
        <Box sx={{ mb: 3 }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>Spinner</Heading>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Spinner size="small" />
            <Spinner />
            <Spinner size="large" />
          </Box>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>Progress Bar</Heading>
          <Box sx={{ mb: 2 }}>
            <ProgressBar progress={30} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <ProgressBar progress={60} barSize="large" />
          </Box>
          <Box sx={{ mb: 2 }}>
            <ProgressBar progress={100} variant="success" />
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ my: 5 }}>
        <Heading as="h2" sx={{ fontSize: 3, mb: 3 }}>Timeline</Heading>
        
        <Timeline>
          <Timeline.Item>
            <Timeline.Badge>
              <PlusIcon />
            </Timeline.Badge>
            <Timeline.Body>
              <Text sx={{ fontWeight: 'bold' }}>Feature added</Text>
              <Text>Added new component demonstrations</Text>
            </Timeline.Body>
          </Timeline.Item>
          
          <Timeline.Item>
            <Timeline.Badge>
              <GearIcon />
            </Timeline.Badge>
            <Timeline.Body>
              <Text sx={{ fontWeight: 'bold' }}>Configuration updated</Text>
              <Text>Updated project dependencies</Text>
            </Timeline.Body>
          </Timeline.Item>
          
          <Timeline.Item>
            <Timeline.Badge>
              <InfoIcon />
            </Timeline.Badge>
            <Timeline.Body>
              <Text sx={{ fontWeight: 'bold' }}>Project initiated</Text>
              <Text>Initial project setup completed</Text>
            </Timeline.Body>
          </Timeline.Item>
        </Timeline>
      </Box>
    </Box>
  );
};

export default ComponentDemoPage;

import {
  Container,
  Avatar,
  Button,
  Group,
  Modal,
  Text,
  TextInput,
  Textarea,
  Checkbox,
  MultiSelect,
  SelectItemProps,
  MultiSelectValueProps,
  rem,
  Box,
  CloseButton,
  Flex,
  Center,
} from "@mantine/core";
import { forwardRef, useEffect, useState } from "react";
import {
  deletePostapi,
  getDataForDependenciesMultiSelect,
  getSinglePost,
  updatePost,
} from "@/api/posts";
import { AdminNav } from "@/components/adminnav";
import { AdminProjectItem, ProjectPost } from "@/components/admin_project_item";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { getTechnologyBadgeContent } from "@/helpers/technologyBadges";
import { notifications } from "@mantine/notifications";
import { BsTrash } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import { useDisclosure } from "@mantine/hooks";

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);

  function Value({
    value,
    label,
    onRemove,
    classNames,
    ...others
  }: MultiSelectValueProps & { value: string }) {
    return (
      <div {...others}>
        <Box
          sx={(theme) => ({
            display: "flex",
            cursor: "default",
            alignItems: "center",
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
            border: `${rem(1)} solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[4]
            }`,
            paddingLeft: theme.spacing.xs,
            borderRadius: theme.radius.sm,
          })}
        >
          <Box mr={10}>
            <Avatar size="xs" src={(others as any).image} />
          </Box>
          <Box sx={{ lineHeight: 1, fontSize: rem(12) }}>{label}</Box>
          <CloseButton
            onMouseDown={onRemove}
            variant="transparent"
            size={22}
            iconSize={14}
            tabIndex={-1}
          />
        </Box>
      </div>
    );
  }

  const Item = forwardRef<HTMLDivElement, SelectItemProps>(
    ({ label, value, ...others }, ref) => (
      <div ref={ref} {...others}>
        <Flex align="center">
          <Box mr={10}>
            <Avatar size="sm" src={(others as any).image} />
          </Box>
          <div>{label}</div>
        </Flex>
      </div>
    )
  );

  function ValueTech({
    value,
    label,
    onRemove,
    classNames,
    ...others
  }: MultiSelectValueProps & { value: string }) {
    let image = getTechnologyBadgeContent(label);
    return (
      <div {...others}>
        <Box
          sx={(theme) => ({
            display: "flex",
            cursor: "default",
            alignItems: "center",
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
            border: `${rem(1)} solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[4]
            }`,
            paddingLeft: theme.spacing.xs,
            borderRadius: theme.radius.sm,
          })}
        >
          <Box mr={10}>{image.icon}</Box>
          <Box sx={{ lineHeight: 1, fontSize: rem(12) }}>{label}</Box>
          <CloseButton
            onMouseDown={onRemove}
            variant="transparent"
            size={22}
            iconSize={14}
            tabIndex={-1}
          />
        </Box>
      </div>
    );
  }

  const ItemTech = forwardRef<HTMLDivElement, SelectItemProps>(
    ({ label, value, ...others }, ref) => {
      let image = getTechnologyBadgeContent(label as string);

      let Icon = () => image.icon;

      return (
        <div ref={ref} {...others}>
          <Flex align="center">
            <Box mr={10}>
              <Icon />
            </Box>
            <div>{label}</div>
          </Flex>
        </div>
      );
    }
  );

  const [post, setPost] = useState<any>();
  const [technologies, setTechnologies] = useState<string[]>([
    "TypeScript",
    "Go",
    "ExpressJS",
    "React",
    "Postgres",
    "NextJS",
    "NGINX",
    "WebSockets",
    "Docker",
    "NPM",
  ]);
  const router = useRouter();
  const { id, action } = router.query;

  const [imageHovered, setImageHovered] = useState(false);
  const [multiSelectDependencies, setMultiSelectDependencies] = useState<any>(
    {}
  );

  useEffect(() => {
    if (id !== undefined) {
      getSinglePost(id as string).then(async (res: any) => {
        const res_json = await res.json();
        setPost(res_json.data);
      });

      getDataForDependenciesMultiSelect().then(async (res: any) => {
        const res_json = await res.json();
        setMultiSelectDependencies(res_json.data);
      });
    }
  }, [id]);

  const editPost = () => {
    updatePost(post, id).then((res: any) => {
      notifications.show({
        title: "success",
        message: "post updated successfully",
      });
    });
  };

  const deletePost = () => {
    deletePostapi(id as string).then((res: any) => {
      notifications.show({
        title: "success",
        message: "post deleted successfully",
      });
    });
    window.location.replace(`${window.location.origin}/posts`);
  };

  useEffect(() => {
    if (action !== undefined && action === "delete") {
      open();
    }
  }, [action]);

  const { loggedIn } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {loggedIn ? (
        <>
          <Modal
            centered
            style={{ fontFamily: "helvetica", marginLeft: -32 }}
            opened={modalOpen}
            onClose={() => setModalOpen(false)}
            title="New post!"
          >
            <Avatar size="sm" src={post?.image} />
            <TextInput
              defaultValue={post?.image}
              onChange={(e) => setPost({ ...post, image: e.target.value })}
            />
          </Modal>
          <Text>
            <Modal
              style={{ fontFamily: "helvetica" }}
              opened={opened}
              title="Are you sure you want to delete this Post"
              onClose={close}
              centered
            >
              <Text color="dimmed">
                This will remove it from the database and will be gone forever
              </Text>
              <Button m="xs" color="red" onClick={deletePost}>
                Yes delete this post
              </Button>
              <Button m="xs" color="gray" onClick={close}>
                No go back
              </Button>
            </Modal>
          </Text>
          <Container p="xl">
            <AdminNav />
            <Group mt={50} mb={20} position="apart">
              <Group>
                <Avatar
                  sx={
                    imageHovered
                      ? {
                          "&::after": {
                            content: '"edit"',
                            position: "absolute",
                            zIndex: 100,
                            color: "white",
                            fontFamily: "helvetica",
                            left: "50%",
                            top: "50%",
                            fontSize: "10px",
                            transform: "translate(-50%,-50%)",
                          },
                          background: "rgb(60,60,60,0.2)",
                          cursor: "pointer",
                        }
                      : {}
                  }
                  src={post?.image}
                  onMouseEnter={() => setImageHovered(true)}
                  onMouseLeave={() => setImageHovered(false)}
                  onClick={() => setModalOpen(true)}
                />
                <TextInput
                  defaultValue={post?.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                />
              </Group>
              <Button leftIcon={<BsTrash />} color="red" onClick={open}>
                Delete
              </Button>
            </Group>
            <Textarea
              label="description"
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
              defaultValue={post?.description}
            />
            <TextInput
              mt="sm"
              label="github link"
              defaultValue={post?.github}
              onChange={(e) => setPost({ ...post, github: e.target.value })}
            />
            <TextInput
              mt="sm"
              label="site link"
              onChange={(e) => setPost({ ...post, site: e.target.value })}
              defaultValue={post?.site}
            />

            <MultiSelect
              itemComponent={ItemTech}
              valueComponent={ValueTech}
              label="technologies"
              mt="sm"
              data={technologies}
              getCreateLabel={(query) => `+ Create ${query}`}
              creatable
              searchable
              onCreate={(query) => {
                setTechnologies((current: any) => [...current, query]);
                return query;
              }}
              value={post?.technologies}
              onChange={(current) =>
                setPost({ ...post, technologies: current })
              }
            >
              {/* getTechnologyBadgeContent */}
            </MultiSelect>

            <Checkbox
              onChange={(e) =>
                setPost({ ...post, isorganisation: e.target.checked })
              }
              mt="sm"
              label="Is this an organisation"
              defaultChecked={post?.isorganisation}
            />
            {post?.isorganisation && (
              <MultiSelect
                itemComponent={Item}
                valueComponent={Value}
                mt="sm"
                searchable
                data={multiSelectDependencies.map((dep: any) => ({
                  value: `${dep.id}`,
                  label: dep.title,
                  image: dep.image,
                }))}
                value={post.organisation_dependencies}
                onChange={(current) =>
                  setPost({ ...post, organisation_dependencies: current })
                }
              ></MultiSelect>
            )}
            <Checkbox
              onChange={(e) =>
                setPost({ ...post, isspotlight: e.target.checked })
              }
              mt="sm"
              label="Is this in the spotlight"
              defaultChecked={post?.isspotlight}
            />
            <Center mt="xs">
              <Button color="green" leftIcon={<BiSave />} onClick={editPost}>
                Save Changes
              </Button>
            </Center>
          </Container>
        </>
      ) : (
        typeof window !== "undefined" &&
        window.location.replace(window.location.origin + "/login")
      )}
    </>
  );
}
